import { HttpResponse, RequestHandler, delay, http, passthrough } from 'msw'
import { setupWorker } from 'msw/browser'

const mockApi = async (handlers: RequestHandler[]) => {
  const worker = setupWorker(...handlers)

  await worker.start({
    onUnhandledRequest: 'bypass',
  })

  return worker
}

export { mockApi, HttpResponse, RequestHandler, http, delay, passthrough }
