import { faker } from '@faker-js/faker'
import { NumberFakerConfig } from '../types'

export const generateNumber = (config: NumberFakerConfig) => {
  return faker.number.int({
    min: config.min,
    max: config.max,
  })
}
