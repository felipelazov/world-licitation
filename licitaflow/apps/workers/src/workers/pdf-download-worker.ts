// Worker de Download de PDF — baixa PDF do edital e sobe pro Supabase Storage

import { Worker, type Job } from 'bullmq'
import { createClient } from '@supabase/supabase-js'
import { getRedisConnection } from '../queues/scraping'
import {
  PDF_DOWNLOAD_QUEUE_NAME,
  type PdfDownloadJobData,
  type PdfDownloadJobResult,
} from '../queues/pdf-download'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const STORAGE_BUCKET = 'documents'

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient(url, key)
}

function buildStoragePath(tenantId: string, editalId: string, fileName: string): string {
  return `${tenantId}/editals/${editalId}/${fileName}`
}

async function downloadPdf(url: string): Promise<{ buffer: ArrayBuffer; contentType: string }> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'LicitaFlow/1.0 (PDF Download Worker)',
    },
  })

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`)
  }

  const contentLength = response.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${contentLength} bytes (max: ${MAX_FILE_SIZE})`)
  }

  const buffer = await response.arrayBuffer()

  if (buffer.byteLength > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${buffer.byteLength} bytes (max: ${MAX_FILE_SIZE})`)
  }

  const contentType = response.headers.get('content-type') ?? 'application/pdf'

  return { buffer, contentType }
}

async function processPdfDownloadJob(
  job: Job<PdfDownloadJobData, PdfDownloadJobResult>
): Promise<PdfDownloadJobResult> {
  const { editalId, pdfUrl, tenantId, fileName } = job.data
  const startTime = Date.now()

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'pdf_download_started',
    jobId: job.id,
    editalId,
    pdfUrl,
  }))

  await job.updateProgress(10)

  // 1. Download do PDF
  const { buffer, contentType } = await downloadPdf(pdfUrl)

  await job.updateProgress(50)

  // 2. Upload pro Supabase Storage
  const supabase = getSupabaseAdmin()
  const finalFileName = fileName ?? `edital-${editalId}.pdf`
  const storagePath = buildStoragePath(tenantId, editalId, finalFileName)

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, buffer, {
      contentType,
      upsert: true,
    })

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  await job.updateProgress(80)

  // 3. Atualizar editals.pdf_storage_path
  const { error: updateError } = await supabase
    .from('editals')
    .update({ pdf_storage_path: storagePath })
    .eq('id', editalId)

  if (updateError) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'warn',
      event: 'pdf_db_update_failed',
      jobId: job.id,
      editalId,
      error: updateError.message,
    }))
  }

  await job.updateProgress(100)

  const duration = Date.now() - startTime
  const result: PdfDownloadJobResult = {
    editalId,
    storagePath,
    fileSize: buffer.byteLength,
    duration,
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'pdf_download_completed',
    jobId: job.id,
    ...result,
  }))

  return result
}

export function createPdfDownloadWorker() {
  const worker = new Worker<PdfDownloadJobData, PdfDownloadJobResult>(
    PDF_DOWNLOAD_QUEUE_NAME,
    processPdfDownloadJob,
    {
      connection: getRedisConnection(),
      concurrency: 3,
      limiter: {
        max: 10,
        duration: 60000, // Max 10 downloads por minuto
      },
    }
  )

  worker.on('completed', (job, result) => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'info',
      event: 'pdf_worker_completed',
      jobId: job.id,
      editalId: result.editalId,
      fileSize: result.fileSize,
      storagePath: result.storagePath,
    }))
  })

  worker.on('failed', (job, error) => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      event: 'pdf_worker_failed',
      jobId: job?.id,
      editalId: job?.data.editalId,
      error: error.message,
      attemptsMade: job?.attemptsMade,
    }))
  })

  worker.on('error', (error) => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      event: 'pdf_worker_error',
      error: error.message,
    }))
  })

  return worker
}
