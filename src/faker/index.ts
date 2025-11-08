import { Faker } from '@faker-js/faker'
import { FakerWrapper } from '@/faker/fakerWrapper'
import { Locale, locales } from '@/faker/locales'

const initialInstance = new Faker({ locale: [locales.en, locales.base] })

export const fakerModules = {
  airline: initialInstance.airline,
  animal: initialInstance.animal,
  book: initialInstance.book,
  color: initialInstance.color,
  commerce: initialInstance.commerce,
  company: initialInstance.company,
  database: initialInstance.database,
  datatype: initialInstance.datatype,
  date: initialInstance.date,
  finance: initialInstance.finance,
  food: initialInstance.food,
  git: initialInstance.git,
  hacker: initialInstance.hacker,
  helpers: initialInstance.helpers,
  image: initialInstance.image,
  internet: initialInstance.internet,
  location: initialInstance.location,
  lorem: initialInstance.lorem,
  music: initialInstance.music,
  number: initialInstance.number,
  person: initialInstance.person,
  phone: initialInstance.phone,
  science: initialInstance.science,
  string: initialInstance.string,
  system: initialInstance.system,
  vehicle: initialInstance.vehicle,
  word: initialInstance.word,
}
export type FakerModules = Pick<
  Faker,
  | 'airline'
  | 'animal'
  | 'book'
  | 'color'
  | 'commerce'
  | 'company'
  | 'database'
  | 'datatype'
  | 'date'
  | 'finance'
  | 'food'
  | 'git'
  | 'hacker'
  | 'helpers'
  | 'image'
  | 'internet'
  | 'location'
  | 'lorem'
  | 'music'
  | 'number'
  | 'person'
  | 'phone'
  | 'science'
  | 'string'
  | 'system'
  | 'vehicle'
  | 'word'
>

const buildModules = (locale: Locale) => {
  const newInstance = new Faker({ locale: [locales[locale], locales.en, locales.base] })

  const modules = Object.keys(fakerModules) as (keyof typeof fakerModules)[]

  modules.forEach((moduleName) => {
    // @ts-ignore
    fakerModules[moduleName] = newInstance[moduleName]
  })
}

export function setLocale(locale: Locale) {
  buildModules(locale)
}

export function fake(): typeof FakerWrapper
export function fake<T extends (...p: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): FakerWrapper<'instance'>

export function fake<T extends (...p: any[]) => any>(fn?: T, ...args: Parameters<T>) {
  if (fn) {
    return FakerWrapper.instance(fn, ...args)
  }

  return FakerWrapper
}
