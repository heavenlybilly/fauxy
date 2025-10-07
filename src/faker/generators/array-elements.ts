import { faker } from '@faker-js/faker'
import { makeCount } from '@/faker/utils'
import { ArrayElementsFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateArrayElements = (config: ArrayElementsFakerConfig) => {
  return faker.helpers.arrayElements(config.items, makeCount(config.count))
}
