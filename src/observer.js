import Dep from './dep';

export default class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (!data || typeof data !== 'object') {
      return;
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]);
    })
  }
  defineReactive(data, key, value) {
    let that = this;
    let dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue != value) {
          // 这里的this不是实例 
          that.observe(newValue);// 如果是设置的是对象继续劫持
          value = newValue;
          dep.notify(); // 通知所有人 数据更新了
        }
      }
    })
  }
}
