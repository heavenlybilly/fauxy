import { HttpResponse, RequestHandler, delay, http, passthrough } from 'msw'
import { SetupWorkerApi } from 'msw/browser'
import { FakerWrapper } from '@/faker/fakerWrapper'

export { HttpResponse, RequestHandler, http, delay, passthrough }

export declare const mockApi: (handlers: RequestHandler[]) => SetupWorkerApi

export declare function fake(): typeof FakerWrapper
