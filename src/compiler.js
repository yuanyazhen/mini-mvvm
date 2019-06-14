export default class Compiler{
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
        [...el.childNodes].forEach(item => fragment.appendChild(item));
        return fragment;
    }
    compileElement(node) {

    }
    compileText(node) {
        // {{a}} {{b}}
        // const a = 
        console.log('text =>', node.textContent)
        const expr = node.textContent
        if(expr) {
            compileUtils.text(node, expr, this.vm)
        }
    }
    compile(fragment) {
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(node => {
            if(this.isElementNode(node)) {
                this.compileElement(node)
                this.compile(node)
            } else {
                this.compileText(node)
            }
        })
        console.log(childNodes)

    }
}

const compileUtils = {
    /**
     * 
     * @param {当前 DOM 节点} node 
     * @param {提取出的表达式} expr 
     * @param {需要在 vm 里面拿到 data} vm 
     */
    text(node, expr, vm) {
        const param = expr.match(/\{\{(.*?)\}\}/g);
    },
    updater: {
        textUpdater() {
            node.replace(expr, )
        }
    }
}
