import { sum } from './index'

describe('sum function', () => {
  it('should return the correct sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum(-1, 1)).toBe(0)
    expect(sum(-1, -1)).toBe(-2)
  })
})
