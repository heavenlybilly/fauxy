import { fakerRU } from '@faker-js/faker'
import { makeCount } from '@/faker/utils'
import { WordsFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateWords = (config: WordsFakerConfig) => {
  return fakerRU.word.words({
    count: makeCount(config?.count),
  })
}
