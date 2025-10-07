import { Count } from '@/faker/types'

export const makeCount = (count?: Count): number => {
  if (count === undefined) {
    return 1
  }

  if (typeof count === 'number') {
    return count
  }

  const { min, max } = count

  if (min > max) {
    throw new Error('Min cannot be greater than max')
  }

  if (min < 0 || max < 0) {
    throw new Error('Count values cannot be negative')
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}
