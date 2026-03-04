// Cron Scheduler — agenda jobs recorrentes de scraping

import type { Queue } from 'bullmq'
import type { ScrapingJobData, ScrapingJobResult } from '../queues/scraping'

export interface ScheduleConfig {
  comprasGov: {
    enabled: boolean
    cron: string // Ex: '0 */1 * * *' (a cada 1h)
    keywords: string[]
  }
  becSp: {
    enabled: boolean
    cron: string // Ex: '0 */4 * * *' (a cada 4h)
    keywords: string[]
  }
  documentExpiry: {
    enabled: boolean
    cron: string // Ex: '0 8 * * *' (diário às 8h)
  }
}

const DEFAULT_SCHEDULE: ScheduleConfig = {
  comprasGov: {
    enabled: true,
    cron: '0 */1 * * *', // A cada 1 hora
    keywords: ['cesta basica', 'generos alimenticios', 'alimentacao escolar', 'merenda'],
  },
  becSp: {
    enabled: true,
    cron: '0 */4 * * *', // A cada 4 horas
    keywords: ['cesta basica', 'generos alimenticios', 'alimentacao escolar'],
  },
  documentExpiry: {
    enabled: true,
    cron: '0 8 * * *', // Diário às 8h
  },
}

export async function setupScheduler(
  queue: Queue<ScrapingJobData, ScrapingJobResult>,
  config: Partial<ScheduleConfig> = {}
) {
  const schedule: ScheduleConfig = {
    comprasGov: { ...DEFAULT_SCHEDULE.comprasGov, ...config.comprasGov },
    becSp: { ...DEFAULT_SCHEDULE.becSp, ...config.becSp },
    documentExpiry: { ...DEFAULT_SCHEDULE.documentExpiry, ...config.documentExpiry },
  }

  // Remove jobs agendados antigos
  const repeatableJobs = await queue.getRepeatableJobs()
  for (const job of repeatableJobs) {
    await queue.removeRepeatableByKey(job.key)
  }

  // Agendar Compras.gov.br
  if (schedule.comprasGov.enabled) {
    await queue.add(
      'scrape-compras-gov',
      {
        source: 'compras_gov_br',
        keywords: schedule.comprasGov.keywords,
      },
      {
        repeat: { pattern: schedule.comprasGov.cron },
        jobId: 'recurring-compras-gov',
      }
    )
    console.log(`[Scheduler] Compras.gov.br: ${schedule.comprasGov.cron}`)
  }

  // Agendar BEC-SP
  if (schedule.becSp.enabled) {
    await queue.add(
      'scrape-bec-sp',
      {
        source: 'bec_sp',
        keywords: schedule.becSp.keywords,
      },
      {
        repeat: { pattern: schedule.becSp.cron },
        jobId: 'recurring-bec-sp',
      }
    )
    console.log(`[Scheduler] BEC-SP: ${schedule.becSp.cron}`)
  }

  // Agendar cron de status de documentos
  if (schedule.documentExpiry.enabled) {
    // Usa setInterval para rodar o cron de documentos (não depende de BullMQ queue)
    const { runDocumentStatusCron } = await import('./document-status')
    const { runDocumentAlertsCron } = await import('./document-alerts')

    // Rodar imediatamente na inicialização
    runDocumentStatusCron().then(() => runDocumentAlertsCron()).catch(console.error)

    // Agendar para rodar a cada 24h (86400000ms)
    setInterval(async () => {
      try {
        await runDocumentStatusCron()
        await runDocumentAlertsCron()
      } catch (err) {
        console.error('[Scheduler] Document cron error:', err)
      }
    }, 24 * 60 * 60 * 1000)

    console.log(`[Scheduler] Document status/alerts: daily`)
  }

  console.log('[Scheduler] All recurring jobs configured')
}
