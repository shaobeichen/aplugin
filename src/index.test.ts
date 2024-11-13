import { betaCalc } from './index'

describe('plugin flow', () => {
  it('plugin base test', () => {
    betaCalc.setValue(3)
    expect(betaCalc.currentValue).toBe(3)
    betaCalc.press('plus', 2)
    expect(betaCalc.currentValue).toBe(5)
    betaCalc.press('minus', 4)
    expect(betaCalc.currentValue).toBe(1)
  })
  it('plugin base test', () => {
    const name = 'squared'
    const squaredPlugin = {
      name,
      exec: (currentValue: number) => currentValue * currentValue,
    }
    betaCalc.register(squaredPlugin)
    betaCalc.setValue(5)
    betaCalc.press<typeof name>(name)
    expect(betaCalc.currentValue).toBe(25)
  })
})
