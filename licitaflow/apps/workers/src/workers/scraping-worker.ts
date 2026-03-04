// Worker de Scraping — processa jobs da queue

import { Worker, type Job } from 'bullmq'
import {
  SCRAPING_QUEUE_NAME,
  getRedisConnection,
  type ScrapingJobData,
  type ScrapingJobResult,
} from '../queues/scraping'
import { ComprasGovScraper } from '../scrapers/compras-gov'
import { BecSpScraper } from '../scrapers/bec-sp'
import type { BaseScraper } from '../scrapers/base-scraper'
import type { ScraperConfig, ScraperResult } from '../scrapers/types'

function createScraper(source: string, config: ScraperConfig): BaseScraper {
  switch (source) {
    case 'compras_gov_br':
      return new ComprasGovScraper(config)
    case 'bec_sp':
      return new BecSpScraper(config)
    default:
      throw new Error(`Unknown scraper source: ${source}`)
  }
}

async function processScrapingJob(
  job: Job<ScrapingJobData, ScrapingJobResult>
): Promise<ScrapingJobResult> {
  const { source, keywords, maxPages } = job.data
  const startTime = Date.now()

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'job_started',
    jobId: job.id,
    source,
    keywords,
  }))

  // Atualizar progresso
  await job.updateProgress(10)

  const config: ScraperConfig = {
    keywords,
    maxPages: maxPages ?? 5,
  }

  const scraper = createScraper(source, config)
  const result: ScraperResult = await scraper.execute()

  await job.updateProgress(80)

  // TODO: Upsert editais no banco e criar notificações
  // Isso será feito quando integrar com Supabase service client
  // Por ora, retornamos os stats do scraping

  const duration = Date.now() - startTime

  const jobResult: ScrapingJobResult = {
    source: result.source,
    found: result.stats.found,
    new: result.stats.new,
    updated: result.stats.updated,
    errors: result.stats.errors,
    duration,
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'info',
    event: 'job_completed',
    jobId: job.id,
    ...jobResult,
  }))

  await job.updateProgress(100)

  return jobResult
}

export function createScrapingWorker() {
  const worker = new Worker<ScrapingJobData, ScrapingJobResult>(
    SCRAPING_QUEUE_NAME,
    processScrapingJob,
    {
      connection: getRedisConnection(),
      concurrency: 2,
      limiter: {
        max: 5,
        duration: 60000, // Max 5 jobs por minuto
      },
    }
  )

  worker.on('completed', (job, result) => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'info',
      event: 'worker_completed',
      jobId: job.id,
      source: result.source,
      found: result.found,
    }))
  })

  worker.on('failed', (job, error) => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      event: 'worker_failed',
      jobId: job?.id,
      error: error.message,
      attemptsMade: job?.attemptsMade,
    }))
  })

  worker.on('error', (error) => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      event: 'worker_error',
      error: error.message,
    }))
  })

  return worker
}
