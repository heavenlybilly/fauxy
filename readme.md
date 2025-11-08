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

## Notes

- Fauxy uses MSW directly from its package, so you can access all MSW features as usual.
- Faker is only available via Fauxy’s wrapper, which adds convenience methods and some custom enhancements.
- For more advanced usage and configuration, check out the official MSW repository.