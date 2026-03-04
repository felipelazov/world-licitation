// Queue de Download de PDF — BullMQ + Redis

import { Queue } from 'bullmq'
import { getRedisConnection } from './scraping'

export const PDF_DOWNLOAD_QUEUE_NAME = 'pdf-download'

export interface PdfDownloadJobData {
  editalId: string
  pdfUrl: string
  tenantId: string
  fileName?: string
}

export interface PdfDownloadJobResult {
  editalId: string
  storagePath: string
  fileSize: number
  duration: number
}

export function createPdfDownloadQueue() {
  return new Queue<PdfDownloadJobData, PdfDownloadJobResult>(PDF_DOWNLOAD_QUEUE_NAME, {
    connection: getRedisConnection(),
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: {
        age: 7 * 24 * 3600, // 7 dias
        count: 500,
      },
      removeOnFail: {
        age: 14 * 24 * 3600, // 14 dias
      },
    },
  })
}
