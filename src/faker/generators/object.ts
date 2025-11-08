import { FakerWrapper } from '@/faker/fakerWrapper'
import { ObjectFakerWrapperConfig } from '../types'

export const generateObject = (config: ObjectFakerWrapperConfig) => {
  return Object.keys(config.properties).reduce((carry, propertyName) => {
    const propertyValue = config.properties[propertyName]

    const value = propertyValue instanceof FakerWrapper ? propertyValue.create() : propertyValue

    return {
      ...carry,
      [propertyName]: value,
    }
  }, {})
}
