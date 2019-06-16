import Dep from "./dep";

export default class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;

    this.value = this.get();
  }
  getVal(vm, expr) {
    expr = expr.split(".");
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  }
  get() {
    Dep.target = this;
    let value = this.getVal(this.vm, this.expr); // 会调用属性对应的get方法
    Dep.target = null;
    return value;
  }
  update() {
    let newValue = this.getVal(this.vm, this.expr);
    let oldValue = this.value;
    console.log("oldValue:", this.value, this.vm);
    if (newValue !== oldValue) {
      this.cb(newValue); // 对应watch的callback
      this.value = newValue;
    }
  }
}
