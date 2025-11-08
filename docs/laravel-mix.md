# Using Fauxy with Laravel Mix

This section demonstrates how to integrate Fauxy into a project using Laravel Mix, ensuring that all mock-related code
does not end up in production. This was particularly important for me, as supporting very old browser versions was
challenging.

> **Note:** This is just an example setup to demonstrate how Fauxy can be integrated with Laravel Mix.
> It is not meant to be a production-ready configuration, and some parts of the code are simplified for illustrative purposes.
> Adjust it according to your project's requirements and best practices.

First, create a file, for example, `resources/ts/mock.ts`, and initialize Fauxy there.

Next, add the following code to your `webpack.mix.js`:

```js
const mockSrc = process.env.MIX_MOCK_API === 'true' ? ['resources/ts/mock.ts'] : [];

mix
  .ts([
    ...mockSrc,
    'resources/ts/vue.ts'
  ], 'public/js/vue.js')
```

In this example, I use Vue. Since the `mock.ts` and `vue.ts` files are added to the build independently, it’s important to
ensure that the code from `mock.ts` runs first. The simplest way to achieve this is:

```ts
// mock.ts
import { mockApi } from 'fauxy'
import someHandlers from '@/mocks/handlers/some-handlers'

window.MOCK_SETUP = {
  startMock: async () => {
    return mockApi([...someHandlers])
  },
}
```

```ts
// vue.ts
import Vue from 'vue'

const initApp = async () => {
  if (window?.MOCK_SETUP?.startMock) {
    await window.MOCK_SETUP?.startMock()
  }

  return new Vue({
    el: '#app',
    pinia,
  })
}
```