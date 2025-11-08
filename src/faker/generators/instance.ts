import { InstanceFakerWrapperConfig } from '../types'

export const generateUsingInstance = (config: InstanceFakerWrapperConfig) => {
  // @ts-ignore
  return config.callback(...config.args)
}
