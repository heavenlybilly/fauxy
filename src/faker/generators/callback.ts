import { CallbackFakerWrapperConfig } from '../types'

export const generateUsingCallback = (config: CallbackFakerWrapperConfig) => {
  return config.callback()
}
