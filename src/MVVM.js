import Compiler from './compiler';

class MVVM {
  constructor(options) {
    // 简易版：先处理 el 和 data 两个入参，实际 options 可能有其他参数
    const { el, data } = options
    this.$el = el && el.nodeType === 1 ? el : document.querySelector(el)
    this.$data = data

    if (!this.$el) {
      console.log('no el param')
      return
    }

    new Compiler(this.$el, this)
  }
}

export default MVVM