import { UsePlugin, betaCalc } from './index'

describe('plugin flow', () => {
  it('preset plugin test', () => {
    betaCalc.setValue(3)
    expect(betaCalc.currentValue).toBe(3)
    betaCalc.run('plus', 2)
    expect(betaCalc.currentValue).toBe(5)
    betaCalc.run('minus', 4)
    expect(betaCalc.currentValue).toBe(1)
  })
  it('add plugin test', () => {
    const name = 'squared'
    const plugin: UsePlugin = {
      name,
      exec: (currentValue) => currentValue * currentValue,
    }
    betaCalc.setValue(5)
    betaCalc.install(plugin, { version: '1.0.1' })
    betaCalc.run(name)
    expect(betaCalc.currentValue).toBe(25)
  })
})
