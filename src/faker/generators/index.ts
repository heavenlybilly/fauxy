import { FakerConfig } from '../types'
import { generateArray } from './array'
import { generateArrayElement } from './array-element'
import { generateArrayElements } from './array-elements'
import { generateBoolean } from './boolean'
import { generateCallback } from './callback'
import { generateDate } from './date'
import { generateFullName } from './full-name'
import { generateNumber } from './number'
import { generateObject } from './object'
import { generatePersonalNumber } from './personal-number'
import { generateRank } from './rank'
import { generateUrl } from './url'
import { generateUuid } from './uuid'
import { generateWords } from './words'

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
    case 'uuid':
      return generateUuid(params.config)
    case 'boolean':
      return generateBoolean(params.config)
    case 'words':
      return generateWords(params.config)
    case 'number':
      return generateNumber(params.config)
    case 'url':
      return generateUrl(params.config)
    case 'date':
      return generateDate(params.config)
    case 'personalNumber':
      return generatePersonalNumber(params.config)
    case 'fullName':
      return generateFullName(params.config)
    case 'rank':
      return generateRank(params.config)
    case 'arrayElement':
      return generateArrayElement(params.config)
    case 'arrayElements':
      return generateArrayElements(params.config)
    case 'callback':
      return generateCallback(params.config)
    case 'object':
      return generateObject(params.config)
    case 'array':
      return generateArray(params.config)
    default: {
      const _: never = type
      throw new Error(`Unsupported type ${_}`)
    }
  }
}
