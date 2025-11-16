# Fauxy

Fauxy is a lightweight wrapper around **faker.js** and **MSW** (Mock Service Worker), designed to simplify mocking data
and API requests for front-end development. MSW is used as-is (imported directly from the package),
while Faker is wrapped with a special API that adds some convenience helpers and customizations. I created Fauxy
primarily for my own convenience, but I hope it can be useful to others as well.

## Features

- Simple API for generating mock data using a wrapped version of **faker.js** with additional helpers.
- Built-in **MSW** integration to mock API requests.
- Ready-to-use mock service worker file for front-end development.
- Lightweight and easy to set up.

## Installation

```bash
npm install fauxy
npx fauxy init
```

To ensure MSW knows where to find the service worker, add the following section to your package.json:

```json
"msw": {
    "workerDirectory": [
    "public"
  ]
}
```

An example of starting the mock service worker:

```ts
// @mocks/index.ts
import { mockApi } from 'fauxy'
import someHandlers from '@/mocks/handlers/some-handlers'

mockApi.start([...someHandlers])
```

```ts
// @mocks/handlers/some-handlers.ts
import { HttpResponse, delay, http, fake, fakerModules as fm } from 'fauxy'

export default [
  http.post('/api/persons/select', async () => {
    await delay()

    const items = fake().array({
      count: 10,
      items: fake().object({
        properties: {
          id: fake(fm.string.uuid),
          title: fake(fm.person.fullName),
        },
      }),
    })

    return HttpResponse.json(items)
  }),
]
```

## How to use


> How to use with [Laravel Mix](docs/laravel-mix.md)

The following example demonstrates how to use `fake` and `fakerModules` to generate mock objects and arrays. It also
shows how to set the locale for Faker.

```ts
import { fake, fakerModules as fm, setLocale } from 'fauxy'

interface Person {
  id: string
  name: string
  age: number
}

// set the Faker locale
setLocale('ru')

// generate an array of Person objects
const persons = fake()
  .array({
    count: { min: 2, max: 4 }, // number of items in the array
    items: fake().object<Person>({
      properties: {
        id: fake(fm.string.uuid), // generate a UUID for the id
        name: fake(fm.person.fullName), // generate a full name
        age: fake(fm.number.int, { min: 18, max: 35 }), // generate a random integer between 18 and 35
      },
    }),
  })
  .create<Person[]>()

// generate a random date between two specific dates
const date = fake(fm.date.between, { from: '2025-11-01', to: '2025-11-10' }).create()
```

## Page handlers (mocking pages by URL)

Fauxy also provides a small helper to run custom logic when the current browser URL
matches a given pattern. This is useful when you want to "mock" pages themselves
(e.g. inject data into `window` or global state based on the URL), not just API calls.

### Basic usage

```ts
import { page, mockPage } from 'fauxy'

// Define your page handlers
const handlers = [
  // Match a specific person edit page by dynamic route parameter
  page('/person/:personId/edit', ({ params, queryParams, hash, url }) => {
    // Route params from the path
    // Example: '/person/252/edit' -> { personId: '252' }
    console.log(params.personId)

    // Query params from the URL
    // Example: '/person/252/edit?logo=26&tag=a&tag=b'
    // -> { logo: '26', tag: ['a', 'b'] }
    console.log(queryParams.logo)

    // Hash fragment without '#'
    // Example: '/person/252/edit#section-1' -> 'section-1'
    console.log(hash)

    // Full URL object
    console.log(url.href)

    // You can mock any global values here
    ;(window as any).__MOCKED_PERSON_ID__ = params.personId
  }),

  // Match any path under /files/ using a trailing wildcard
  page('/files/*', ({ url }) => {
    console.log('Files page matched:', url.pathname)
  }),
]

// Call mockPage after your app has been rendered and the browser environment is ready
mockPage(handlers)
```

### How matching works

- Only the **pathname** is used for matching patterns.
  - Example: `/person/252/edit?logo=26#section1` is matched against `/person/:personId/edit`.
- Supported pattern features:
  - Static segments: `/dashboard`, `/person/edit`
  - Named params: `/person/:personId/edit`, `/user/:id/posts/:postId`
  - Trailing wildcard: `/files/*` (matches `/files/123`, `/files/a/b/c`, etc.)
- Query string (`?foo=bar`) and hash (`#section`) do **not** affect matching,
  but they are passed to the handler callback as:
  - `queryParams`: `Record<string, string | string[]>`
  - `hash`: `string` (without `#`)

### When to call `mockPage`

`mockPage` does not attach any listeners and does not observe route changes.
It simply:

1. Reads the current `window.location.href`.
2. Matches it against all provided handlers.
3. Synchronously calls callbacks of all matched handlers.

You should call it at the moment when your page is already loaded and
JavaScript can safely modify global state (for example, right after your app
bootstraps).

## Notes

- Fauxy uses MSW directly from its package, so you can access all MSW features as usual.
- Faker is only available via Fauxy’s wrapper, which adds convenience methods and some custom enhancements.
- For more advanced usage and configuration, check out the official MSW repository.