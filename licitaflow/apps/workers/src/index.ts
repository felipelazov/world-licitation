// @licitaflow/workers — Entry point

import { createScrapingQueue } from './queues/scraping'
import { createPdfDownloadQueue } from './queues/pdf-download'
import { createScrapingWorker } from './workers/scraping-worker'
import { createPdfDownloadWorker } from './workers/pdf-download-worker'
import { setupScheduler } from './cron/scheduler'

async function main() {
  console.log('[LicitaFlow Workers] Starting...')

  // Criar queues e workers
  const scrapingQueue = createScrapingQueue()
  const scrapingWorker = createScrapingWorker()
  const pdfQueue = createPdfDownloadQueue()
  const pdfWorker = createPdfDownloadWorker()

  // Configurar cron scheduler
  await setupScheduler(scrapingQueue)

  console.log('[LicitaFlow Workers] Ready. Waiting for jobs.')

  // Health check endpoint (Node.js http)
  const port = parseInt(process.env.WORKERS_PORT ?? '3001')
  const http = await import('http')

  http.createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        scraping: scrapingWorker.isRunning() ? 'running' : 'stopped',
        pdfDownload: pdfWorker.isRunning() ? 'running' : 'stopped',
      }))
    } else {
      res.writeHead(404)
      res.end('Not Found')
    }
  }).listen(port, () => {
    console.log(`[LicitaFlow Workers] Health check on :${port}/health`)
  })

  // Graceful shutdown
  const shutdown = async () => {
    console.log('[LicitaFlow Workers] Shutting down...')
    await scrapingWorker.close()
    await pdfWorker.close()
    await scrapingQueue.close()
    await pdfQueue.close()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

main().catch((error) => {
  console.error('[LicitaFlow Workers] Fatal error:', error)
  process.exit(1)
})
