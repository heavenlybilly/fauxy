import { makeCount } from '@/faker/utils'
import { ArrayFakerConfig } from '../types'

export const generateArray = (config: ArrayFakerConfig) => {
  return Array(makeCount(config.count))
    .fill(null)
    .map(() => {
      return config.items.create()
    })
}
