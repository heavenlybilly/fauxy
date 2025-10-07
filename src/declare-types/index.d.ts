import { HttpResponse, RequestHandler, delay, http, passthrough } from 'msw'
import { SetupWorkerApi } from 'msw/browser'
import { Faker } from '@/faker/faker'

export { HttpResponse, RequestHandler, http, delay, passthrough }

export declare const mockApi: (handlers: RequestHandler[]) => SetupWorkerApi

export declare function faker(): typeof Faker
