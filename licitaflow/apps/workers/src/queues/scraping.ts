// Queue de Scraping — BullMQ + Redis

import { Queue, type ConnectionOptions } from 'bullmq'

export const SCRAPING_QUEUE_NAME = 'scraping'

export interface ScrapingJobData {
  source: 'compras_gov_br' | 'bec_sp'
  tenantId?: string
  keywords: string[]
  maxPages?: number
}

export interface ScrapingJobResult {
  source: string
  found: number
  new: number
  updated: number
  errors: number
  duration: number
}

export function getRedisConnection(): ConnectionOptions {
  return {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379'),
    password: process.env.REDIS_PASSWORD ?? undefined,
    maxRetriesPerRequest: null,
  }
}

export function createScrapingQueue() {
  return new Queue<ScrapingJobData, ScrapingJobResult>(SCRAPING_QUEUE_NAME, {
    connection: getRedisConnection(),
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: {
        age: 24 * 3600, // 24h
        count: 100,
      },
      removeOnFail: {
        age: 7 * 24 * 3600, // 7 dias (dead letter)
      },
    },
  })
}
