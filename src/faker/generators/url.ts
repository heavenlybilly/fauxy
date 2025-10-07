import { faker } from '@faker-js/faker'
import { UrlFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateUrl = (config: UrlFakerConfig) => {
  return faker.internet.url()
}
