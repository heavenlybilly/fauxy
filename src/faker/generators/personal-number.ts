import { PersonalNumberFakerConfig } from '../types'

const letters = ['Х', 'Э', 'ВЕ', 'Е']
const digits = '0123456789'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generatePersonalNumber = (config: PersonalNumberFakerConfig) => {
  return `${letters[Math.floor(Math.random() * letters.length)]}-${Array.from(
    { length: 6 },
    () => digits[Math.floor(Math.random() * digits.length)],
  ).join('')}`
}
