import { generate } from './generators'
import {
  ArrayElementFakerConfig,
  ArrayElementsFakerConfig,
  ArrayFakerConfig,
  CallbackFakerConfig,
  ExtractFakerConfig,
  FakerType,
  NumberFakerConfig,
  ObjectFakerConfig,
  WordsFakerConfig,
} from './types'

export class Faker<T extends FakerType> {
  private readonly params: {
    config: ExtractFakerConfig<T>
    nullable: boolean
    nullableProbability: number
  }

  private constructor(config: ExtractFakerConfig<T>) {
    this.params = {
      config,
      nullable: false,
      nullableProbability: 0,
    }
  }

  public static uuid() {
    return new Faker<'uuid'>({
      type: 'uuid',
    })
  }

  public static boolean() {
    return new Faker<'boolean'>({
      type: 'boolean',
    })
  }

  public static words(params: Omit<WordsFakerConfig, 'type'> = {}) {
    return new Faker<'words'>({
      type: 'words',
      count: params?.count,
    })
  }

  public static number(params: Omit<NumberFakerConfig, 'type'> = {}) {
    return new Faker<'number'>({
      type: 'number',
      min: params?.min ?? 0,
      max: params?.max ?? 1000,
    })
  }

  public static url() {
    return new Faker<'url'>({
      type: 'url',
    })
  }

  public static date() {
    return new Faker<'date'>({
      type: 'date',
    })
  }

  public static fullName() {
    return new Faker<'fullName'>({
      type: 'fullName',
    })
  }

  public static personalNumber() {
    return new Faker<'personalNumber'>({
      type: 'personalNumber',
    })
  }

  public static rank() {
    return new Faker<'rank'>({
      type: 'rank',
    })
  }

  public static arrayElement(params: Omit<ArrayElementFakerConfig, 'type'>) {
    return new Faker<'arrayElement'>({
      type: 'arrayElement',
      items: params.items,
    })
  }

  public static arrayElements(params: Omit<ArrayElementsFakerConfig, 'type'>) {
    return new Faker<'arrayElements'>({
      type: 'arrayElements',
      items: params.items,
      count: params?.count,
    })
  }

  public static callback(callback: CallbackFakerConfig['callback']) {
    return new Faker<'callback'>({
      type: 'callback',
      callback,
    })
  }

  public static array(params: Omit<ArrayFakerConfig, 'type'>) {
    return new Faker<'array'>({
      type: 'array',
      items: params.items,
      count: params.count,
    })
  }

  public static object<O extends object = object>(params: Omit<ObjectFakerConfig<O>, 'type'>) {
    return new Faker<'object'>({
      type: 'object',
      properties: params.properties,
    })
  }

  // modifiers
  public nullable(probability: number = 0.5) {
    this.params.nullable = true
    this.params.nullableProbability = probability

    return this
  }

  // create methods
  private createSingle<U>(): U {
    return generate(this.params) as U
  }

  private createMultiple<U>(count: number): U[] {
    return Array(count)
      .fill(null)
      .map(() => this.createSingle<U>())
  }

  public create<U>(): U

  public create<U>(count: number): U[]

  public create<U>(count?: number): U | U[] {
    if (count === undefined) {
      return this.createSingle<U>()
    }

    return this.createMultiple<U>(count)
  }
}
