import { Faker } from '@/faker/faker'
import { ObjectFakerConfig } from '../types'

export const generateObject = (config: ObjectFakerConfig) => {
  return Object.keys(config.properties).reduce((carry, propertyName) => {
    const propertyValue = config.properties[propertyName]

    const value = propertyValue instanceof Faker ? propertyValue.create() : propertyValue

    return {
      ...carry,
      [propertyName]: value,
    }
  }, {})
}
