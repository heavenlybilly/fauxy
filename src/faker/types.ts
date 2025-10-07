import { Faker } from './faker'

/**
 * Utils
 */
export type Count =
  | number
  | {
      min: number
      max: number
    }

/**
 * Mock config
 */
export type FakerType =
  | 'uuid'
  | 'boolean'
  | 'words'
  | 'number'
  | 'url'
  | 'fullName'
  | 'date'
  | 'personalNumber'
  | 'rank'
  | 'arrayElement'
  | 'arrayElements'
  | 'callback'
  | 'array'
  | 'object'

interface BaseFakerConfig {
  type: FakerType
}

export interface UuidFakerConfig extends BaseFakerConfig {
  type: 'uuid'
}

export interface BooleanFakerConfig extends BaseFakerConfig {
  type: 'boolean'
}

export interface WordsFakerConfig extends BaseFakerConfig {
  type: 'words'
  count?: Count
}

export interface NumberFakerConfig extends BaseFakerConfig {
  type: 'number'
  min?: number
  max?: number
}

export interface UrlFakerConfig extends BaseFakerConfig {
  type: 'url'
}

export interface DateFakerConfig extends BaseFakerConfig {
  type: 'date'
}

export interface FullNameFakerConfig extends BaseFakerConfig {
  type: 'fullName'
}

export interface PersonalNumberFakerConfig extends BaseFakerConfig {
  type: 'personalNumber'
}

export interface RankFakerConfig extends BaseFakerConfig {
  type: 'rank'
}

export interface ArrayElementFakerConfig extends BaseFakerConfig {
  type: 'arrayElement'
  items: unknown[]
}

export interface ArrayElementsFakerConfig extends BaseFakerConfig {
  type: 'arrayElements'
  items: unknown[]
  count?: Count
}

export interface CallbackFakerConfig extends BaseFakerConfig {
  type: 'callback'
  callback: (...args: unknown[]) => any
}

export interface ArrayFakerConfig extends BaseFakerConfig {
  type: 'array'
  items: Faker<any>
  count: Count
}

export interface ObjectFakerConfig<O extends Record<string, any> = Record<string, any>>
  extends BaseFakerConfig {
  type: 'object'
  properties: {
    [_ in keyof O]: Faker<any> | any
  }
}

export type FakerConfig =
  | UuidFakerConfig
  | BooleanFakerConfig
  | WordsFakerConfig
  | NumberFakerConfig
  | UrlFakerConfig
  | FullNameFakerConfig
  | DateFakerConfig
  | PersonalNumberFakerConfig
  | RankFakerConfig
  | ArrayElementFakerConfig
  | ArrayElementsFakerConfig
  | CallbackFakerConfig
  | ArrayFakerConfig
  | ObjectFakerConfig

export type ExtractFakerConfig<T extends FakerType> = Extract<FakerConfig, { type: T }>
