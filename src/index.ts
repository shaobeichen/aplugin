const core = {
  plus: (currentVal: number, addend: number) => currentVal + addend,
  minus: (currentVal: number, subtrahend: number) => currentVal - subtrahend,
} as const

export const betaCalc = {
  currentValue: 0,

  setValue(value: number) {
    this.currentValue = value
  },

  core,

  plugins: {},

  press<T>(buttonName: keyof typeof core | T, newVal?: number) {
    const func = this.core[buttonName] || this.plugins[buttonName]
    this.setValue(func(this.currentValue, newVal))
  },

  register(plugin: { name: string; exec: (currentVal: number) => number }) {
    const { name, exec } = plugin
    this.plugins[name] = exec
  },
}
