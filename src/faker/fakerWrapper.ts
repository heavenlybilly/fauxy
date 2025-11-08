import { generate } from './generators'
import {
  ArrayFakerWrapperConfig,
  CallbackFakerWrapperConfig,
  ExtractFakerConfig,
  FakerWrapperType,
  ObjectFakerWrapperConfig,
} from './types'

export class FakerWrapper<T extends FakerWrapperType> {
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

  public static callback(callback: CallbackFakerWrapperConfig['callback']) {
    return new FakerWrapper<'callback'>({
      type: 'callback',
      callback,
    })
  }

  public static array(params: Omit<ArrayFakerWrapperConfig, 'type'>) {
    return new FakerWrapper<'array'>({
      type: 'array',
      items: params.items,
      count: params.count,
    })
  }

  public static object<O extends object = object>(
    params: Omit<ObjectFakerWrapperConfig<O>, 'type'>,
  ) {
    return new FakerWrapper<'object'>({
      type: 'object',
      properties: params.properties,
    })
  }

  public static instance<Function extends (...args: any[]) => any>(
    callback: Function,
    ...args: Parameters<Function>
  ) {
    return new FakerWrapper<'instance'>({
      type: 'instance',
      callback,
      args,
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
