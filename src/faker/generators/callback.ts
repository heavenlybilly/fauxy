import { CallbackFakerConfig } from '../types'

export const generateCallback = (config: CallbackFakerConfig) => {
  return config.callback()
}
