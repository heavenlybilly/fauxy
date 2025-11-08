import { FakerWrapper } from './fakerWrapper'

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
export type FakerWrapperType = 'callback' | 'array' | 'object' | 'instance'

interface BaseFakerWrapperConfig {
  type: FakerWrapperType
}

export interface CallbackFakerWrapperConfig extends BaseFakerWrapperConfig {
  type: 'callback'
  callback: (...args: unknown[]) => any
}

export interface ArrayFakerWrapperConfig extends BaseFakerWrapperConfig {
  type: 'array'
  items: FakerWrapper<any>
  count: Count
}

export interface ObjectFakerWrapperConfig<O extends Record<string, any> = Record<string, any>>
  extends BaseFakerWrapperConfig {
  type: 'object'
  properties: {
    [_ in keyof O]: FakerWrapper<any> | any
  }
}

export interface InstanceFakerWrapperConfig extends BaseFakerWrapperConfig {
  type: 'instance'
  callback: () => unknown
  args: unknown[]
}

export type FakerConfig =
  | CallbackFakerWrapperConfig
  | ArrayFakerWrapperConfig
  | ObjectFakerWrapperConfig
  | InstanceFakerWrapperConfig

export type ExtractFakerConfig<T extends FakerWrapperType> = Extract<FakerConfig, { type: T }>
