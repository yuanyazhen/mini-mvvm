import Watcher from './watcher';

export default class Compiler {
  constructor(el, vm) {
    this.el = el;
    this.vm = vm;

    // 1.真实 DOM 移入到内存 fragment 中
    const fragment = this.dom2fragment(this.el);
    // 2.提取指令 v-model 等 和 {{text}}
    this.compile(fragment);
    // 3.将编译好的 fragment 赛回到真实的DOM
    this.el.appendChild(fragment);
  }
  /* utils func */
  isElementNode(node) {
    return node.nodeType === 1;
  }
  /* core function */
  dom2fragment(el) {
    const fragment = document.createDocumentFragment();
    [...el.childNodes].forEach((item) => fragment.appendChild(item));
    return fragment;
  }
  compileElement(node) {
    let attrs = node.attributes;
    [...attrs].forEach((item) => {
      const { name, value } = item;
      if (name.indexOf('v-') >= 0) {
        compileUtils.model(node, value, this.vm);
      }
    });
  }
  compileText(node) {
    // TODO: 多种情况的处理，比如 {{a}} {{b}}
    const expr = node.textContent;
    const reg = /\{\{(.*)\}\}/g;
    if (reg.test(expr)) {
      compileUtils.text(node, expr, this.vm);
    }
  }
  compile(fragment) {
    let childNodes = fragment.childNodes;
    [...childNodes].forEach((node) => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
        this.compile(node);
      } else {
        this.compileText(node);
      }
    });
    // console.log(childNodes)
  }
}

const compileUtils = {
  setVal(vm, expr, value) {
    expr = expr.split('.');
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        return (prev[next] = value);
      }
      return prev[next];
    }, vm.$data);
  },
  /**
   *
   * @param {当前 DOM 节点} node
   * @param {提取出的表达式} expr
   * @param {需要在 vm 里面拿到 data} vm
   */
  text(node, expr, vm) {
    const param = expr.replace(/\{\{(.*?)\}\}/g, '$1');
    // eslint-disable-next-line no-new
    new Watcher(vm, param.trim(), () => {
      // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
      // updateFn && updateFn(node, this.getTextVal(vm, expr));
      this.updater['textUpdater'](node, vm, param.trim());
    });
    this.updater['textUpdater'](node, vm, param.trim());
  },
  model(node, expr, vm) {
    // eslint-disable-next-line no-new
    new Watcher(vm, expr, () => {
      // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
      // updateFn && updateFn(node, this.getTextVal(vm, expr));
      this.updater['modelUpdater'](node, vm, expr);
    });
    node.addEventListener('input', (e) => {
      let newValue = e.target.value;
      // 监听输入事件将输入的内容设置到对应数据上
      this.setVal(vm, expr, newValue);
    });

    this.updater['modelUpdater'](node, vm, expr);
  },
  updater: {
    textUpdater(node, vm, param) {
      const data = vm.$data[param];
      node.textContent = data;
    },
    modelUpdater(node, vm, param) {
      const data = vm.$data[param];
      node.value = data;
    }
  }
};
