import { PageHandler, PageHandlerCallback, PageHandlerCallbackArgs } from './types'

// ... existing code ...

/**
 * Splits a path into segments, ignoring leading and trailing slashes.
 */
function splitPath(path: string): string[] {
  return path.split('/').filter(Boolean)
}

/**
 * Attempts to match a URL pathname against a pattern.
 *
 * Supported syntax:
 *   - Static segments: '/person', '/person/edit'
 *   - Named params: '/person/:personId/edit'
 *   - Trailing wildcard: '/files/*'
 *
 * Notes:
 *   - Query string and hash are not considered during matching.
 *   - Leading/trailing slashes are ignored for comparison.
 *
 * @param pattern The route pattern.
 * @param pathname The current URL pathname.
 * @returns A map of route params if matched, otherwise null.
 */
function matchPathname(pattern: string, pathname: string): Record<string, string> | null {
  const patternSegments = splitPath(pattern)
  const pathSegments = splitPath(pathname)

  // Support trailing wildcard, e.g. '/files/*'
  const hasTrailingWildcard = patternSegments[patternSegments.length - 1] === '*'

  if (hasTrailingWildcard) {
    // All segments except the last '*' must match
    const baseSegments = patternSegments.slice(0, -1)
    if (pathSegments.length < baseSegments.length) {
      return null
    }

    const params: Record<string, string> = {}

    for (let i = 0; i < baseSegments.length; i += 1) {
      const patternSegment = baseSegments[i]
      const pathSegment = pathSegments[i]

      if (patternSegment.startsWith(':')) {
        const paramName = patternSegment.slice(1)
        if (!paramName) {
          return null
        }
        params[paramName] = pathSegment
      } else if (patternSegment !== pathSegment) {
        return null
      }
    }

    return params
  }

  if (patternSegments.length !== pathSegments.length) {
    return null
  }

  const params: Record<string, string> = {}

  for (let i = 0; i < patternSegments.length; i += 1) {
    const patternSegment = patternSegments[i]
    const pathSegment = pathSegments[i]

    if (patternSegment.startsWith(':')) {
      const paramName = patternSegment.slice(1)
      if (!paramName) {
        return null
      }
      params[paramName] = pathSegment
    } else if (patternSegment !== pathSegment) {
      return null
    }
  }

  return params
}

/**
 * Builds a `queryParams` object from URLSearchParams.
 *
 * If a parameter has a single value it is represented as `string`.
 * If it has multiple values, it is represented as `string[]`.
 */
function buildQueryParams(searchParams: URLSearchParams): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {}

  searchParams.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const existing = result[key]
      if (Array.isArray(existing)) {
        existing.push(value)
      } else {
        result[key] = [existing, value]
      }
    } else {
      result[key] = value
    }
  })

  return result
}

/**
 * Helper to safely get the current browser URL.
 *
 * Returns null if executed in a non-browser environment.
 */
function getCurrentBrowserUrl(): URL | null {
  if (typeof window === 'undefined' || typeof window.location === 'undefined') {
    return null
  }

  try {
    return new URL(window.location.href)
  } catch {
    return null
  }
}

/**
 * Helper for declaratively creating a page handler.
 *
 * Example:
 *   const handler = page('/person/:personId/edit', ({ params, queryParams, hash }) => {
 *     // ...
 *   })
 */
export function page(pattern: string, callback: PageHandlerCallback): PageHandler {
  return {
    pattern,
    callback,
  }
}

/**
 * Searches for handlers matching the current browser URL
 * and synchronously executes callbacks of all matched handlers.
 *
 * Notes:
 *   - This function does not manage any lifecycle events.
 *     The consumer is responsible for calling it at the right time
 *     (e.g., after the page has been rendered).
 *   - If executed outside a browser, this function is a no-op.
 */
export function mockPage(handlers: PageHandler[]): void {
  if (!Array.isArray(handlers) || handlers.length === 0) {
    return
  }

  const url = getCurrentBrowserUrl()
  if (!url) {
    return
  }

  const { pathname } = url
  const queryParams = buildQueryParams(url.searchParams)
  const hash = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash

  handlers.forEach((handler) => {
    if (!handler || typeof handler.pattern !== 'string' || typeof handler.callback !== 'function') {
      return
    }

    const params = matchPathname(handler.pattern, pathname)
    if (!params) {
      return
    }

    const args: PageHandlerCallbackArgs = {
      params,
      queryParams,
      hash,
      url,
    }

    handler.callback(args)
  })
}

export type { PageHandler, PageHandlerCallback, PageHandlerCallbackArgs }
