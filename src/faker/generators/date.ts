import { faker } from '@faker-js/faker'
import { DateFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateDate = (config: DateFakerConfig) => {
  const date = new Date(faker.date.anytime())

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day}.${month.toString().padStart(2, '0')}.${year}`
}
