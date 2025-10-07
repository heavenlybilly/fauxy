import { faker } from '@faker-js/faker'
import { UuidFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateUuid = (config: UuidFakerConfig) => {
  return faker.string.uuid()
}
