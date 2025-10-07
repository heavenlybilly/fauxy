# Vue Api Mock 182
description

## Содержание
- [Начало работы](#начало-работы)

## Начало работы

#### Установка пакета
```bash
npm i fauxy
```

#### Настройка окружения
1. Для добавления Mock API в Laravel Mix, необходимо добавить новый файл, например, `resources/ts/mock.ts` с содержимым:
```ts
import { mockApi } from 'fauxy'

mockApi.start()
```

2. Изменить файл `package.json`:
```json
"scripts": {
    "watch:msw": "MIX_MOCK_API=true mix watch",
},
```

Добавить в конец файла:
```json
"msw": {
  "workerDirectory": [
    "public"
  ]
}
```

3. В файле `webpack.mix.js` добавить в сборку файл `mock.ts` (из п.1):
```js
const mockSrc = process.env.MIX_MOCK_API === 'true' ? ['resources/ts/mock.ts'] : [];

mix
  .ts([
    ...mockSrc,
    'resources/ts/vue.ts'
  ], 'public/js/vue.js')
```