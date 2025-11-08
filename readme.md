# Fauxy

Fauxy is a lightweight wrapper around **faker.js** and **MSW** (Mock Service Worker), designed to simplify mocking data
and API requests for both front-end and back-end development. MSW is used as-is (imported directly from the package),
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
import { mockApi } from 'fauxy'

mockApi.start()
```

## How to use ![WIP](https://img.shields.io/badge/status-WIP-yellow)

- [Laravel Mix](docs/laravel-mix.md)

## Notes
- Fauxy uses MSW directly from its package, so you can access all MSW features as usual.
- Faker is only available via Fauxy’s wrapper, which adds convenience methods and some custom enhancements.
- For more advanced usage and configuration, check out the official MSW repository￼.