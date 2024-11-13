export interface UseOptions {
  /**
   * 插件参数
   */
  [key: string]: unknown
}

export interface UsePlugin {
  /**
   * 插件名
   */
  name: string
  /**
   * 插件函数
   * @param currentValue 当前值
   * @param options 插件参数
   * @returns 新值
   */
  exec: (currentValue: number, options?: UseOptions) => number
}

const preset = {
  /**
   * 加法
   * @param currentValue 当前值
   * @param addend 加数
   * @returns 新值
   */
  plus: (currentValue: number, addend: number) => currentValue + addend,
  /**
   *  减法
   * @param currentValue 当前值
   * @param subtrahend 减数
   * @returns 新值
   */
  minus: (currentValue: number, subtrahend: number) => currentValue - subtrahend,
} as const

export const betaCalc = {
  currentValue: 0,

  preset,

  plugin: {},

  setValue(value: number) {
    this.currentValue = value
  },

  run<T>(buttonName: keyof typeof preset | T, newVal?: number) {
    const func = this.preset[buttonName] || this.plugin[buttonName]
    this.setValue(func(this.currentValue, newVal))
  },

  install(plugin: UsePlugin, options?: UseOptions) {
    const { name, exec } = plugin
    const currentValue = this.currentValue
    // 防止污染全局，不暴露this，只传null
    // 如果暴露this，在插件里的exec就可以使用this调用到一些内容
    this.plugin[name] = exec.bind(null, currentValue, options)
  },
}
