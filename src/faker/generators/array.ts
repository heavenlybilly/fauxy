import { makeCount } from '@/faker/utils'
import { ArrayFakerWrapperConfig } from '../types'

export const generateArray = (config: ArrayFakerWrapperConfig) => {
  return Array(makeCount(config.count))
    .fill(null)
    .map(() => {
      return config.items.create()
    })
}
