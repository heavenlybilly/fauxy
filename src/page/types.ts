/**
 * Arguments passed to a page handler callback.
 */
export type PageHandlerCallbackArgs = {
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
export type PageHandler = {
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
