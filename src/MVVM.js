import Compiler from './compiler';
import Observer from './observer';

class MVVM {
  constructor(options) {
    // 简易版：先处理 el 和 data 两个入参，实际 options 可能有其他参数
    const { el, data } = options;
    this.$el = el && el.nodeType === 1 ? el : document.querySelector(el);
    this.$data = data;

    if (!this.$el) {
      console.log('no el param');
      return;
    }

    this.proxyData(this.$data);
    // eslint-disable-next-line no-new
    new Observer(this.$data);
    // eslint-disable-next-line no-new
    new Compiler(this.$el, this);
  }
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        }
      });
    });
  }
}

export default MVVM;
