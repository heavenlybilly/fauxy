import { faker } from '@faker-js/faker'
import { BooleanFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateBoolean = (config: BooleanFakerConfig) => {
  return faker.datatype.boolean()
}
