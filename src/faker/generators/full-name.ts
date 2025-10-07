import { fakerRU } from '@faker-js/faker'
import { FullNameFakerConfig } from '../types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateFullName = (config: FullNameFakerConfig) => {
  const firstName = fakerRU.person.firstName('male')
  const lastName = fakerRU.person.lastName('male')
  const middleName = fakerRU.person.middleName('male')

  return `${lastName} ${firstName} ${middleName}`
}
