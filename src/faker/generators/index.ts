import { generateUsingInstance } from '@/faker/generators/instance'
import { FakerConfig } from '../types'
import { generateArray } from './array'
import { generateUsingCallback } from './callback'
import { generateObject } from './object'

const random = (probability: number) => {
  return Math.random() < probability
}

export const generate = (params: {
  config: FakerConfig
  nullable: boolean
  nullableProbability: number
}) => {
  const { type } = params.config

  if (params.nullable && random(params.nullableProbability)) {
    return null
  }

  switch (type) {
    case 'callback':
      return generateUsingCallback(params.config)
    case 'object':
      return generateObject(params.config)
    case 'array':
      return generateArray(params.config)
    case 'instance':
      return generateUsingInstance(params.config)
    default: {
      const _: never = type
      throw new Error(`Unsupported type ${_}`)
    }
  }
}
