import { HttpResponse, RequestHandler, delay, http, passthrough } from 'msw'
import { SetupWorkerApi } from 'msw/browser'
import { FakerModules } from '@/faker'
import { FakerWrapper } from '@/faker/fakerWrapper'
import { Locale } from '@/faker/locales'

export { HttpResponse, RequestHandler, http, delay, passthrough }

// -- msw
/**
 * Starts the MSW mock service worker with given request handlers.
 */
export declare const mockApi: (handlers: RequestHandler[]) => SetupWorkerApi

// -- faker
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

// -- page
/**
 * Arguments passed to a page handler callback.
 */
export interface PageHandlerCallbackArgs {
  /**
   * Route parameters extracted from the matched pattern.
   *
   * Example:
   *   pattern: '/person/:personId/edit'
   *   pathname: '/person/252/edit'
   *   params: { personId: '252' }
   */
  params: Record<string, string>

  /**
   * Query string parameters extracted from the current URL.
   *
   * Example:
   *   '?logo=26&tag=a&tag=b'
   *   queryParams: { logo: '26', tag: ['a', 'b'] }
   */
  queryParams: Record<string, string | string[]>

  /**
   * Hash fragment without the leading '#'.
   *
   * Example:
   *   '#section-1' -> 'section-1'
   */
  hash: string

  /**
   * Full URL object for maximum flexibility.
   */
  url: URL
}

/**
 * Callback that is executed when a page handler matches
 * the current browser URL.
 */
export type PageHandlerCallback = (args: PageHandlerCallbackArgs) => void

/**
 * Page handler description.
 */
export interface PageHandler {
  /**
   * URL pattern relative to the origin.
   *
   * Examples:
   *   '/person/:personId/edit'
   *   '/user/:id/posts/:postId'
   *
   * Supported features:
   *   - Named params: ':paramName'
   *   - Static segments
   *   - Trailing wildcard '*', e.g. '/files/*'
   */
  pattern: string

  /**
   * Callback that will be executed when the current URL
   * matches the pattern.
   */
  callback: PageHandlerCallback
}

/**
 * Helper for declaratively creating a page handler.
 *
 * Example:
 *   const handler = page('/person/:personId/edit', ({ params, queryParams, hash }) => {
 *     // ...
 *   })
 */
export declare function page(pattern: string, callback: PageHandlerCallback): PageHandler

/**
 * Searches for handlers matching the current browser URL
 * and synchronously executes callbacks of all matched handlers.
 *
 * Notes:
 *   - This function does not manage any lifecycle events.
 *     The consumer is responsible for calling it at the right time
 *     (e.g. after the page has been rendered).
 *   - If executed outside of a browser, this function is a no-op.
 */
export declare function mockPage(handlers: PageHandler[]): void
