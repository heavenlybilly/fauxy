import { HttpResponse, RequestHandler, delay, http, passthrough } from 'msw'
import { SetupWorkerApi } from 'msw/browser'
import { FakerModules } from '@/faker'
import { FakerWrapper } from '@/faker/fakerWrapper'
import { Locale } from '@/faker/locales'

export { HttpResponse, RequestHandler, http, delay, passthrough }

/**
 * Starts the MSW mock service worker with given request handlers.
 */
export declare const mockApi: (handlers: RequestHandler[]) => SetupWorkerApi

/**
 * Faker utility function for generating data using FakerWrapper.
 */
export function fake(): typeof FakerWrapper
export function fake<T extends (...p: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): FakerWrapper<'instance'>

/**
 * Sets the current locale for faker modules.
 */
export declare function setLocale(locale: Locale): void

/**
 * Collection of Faker modules (airline, person, date, etc.).
 * These are dynamically rebuilt when locale changes.
 */
export declare const fakerModules: FakerModules
