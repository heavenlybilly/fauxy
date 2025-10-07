import { faker } from '@faker-js/faker'
import { ArrayElementFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateArrayElement = (config: ArrayElementFakerConfig) => {
  return faker.helpers.arrayElement(config.items)
}
