class Compiler{
    constructor(el, vm) {
        // 在文档片段中解析，解析完成之后再填入真实文档
        this.el = el;
        this.vm = vm;

        const fragment = this.dom2fragment(this.el);
        this.compile(fragment);
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
    dom2fragment(el) {
        const fragment = document.createDocumentFragment();
        [...el.childNodes].forEach(item => fragment.appendChild(item));
        return fragment;
    }
    compileElement(node) {}
    compileText(node) {
        // {{a}} {{b}}
        
    }
    compile(fragment) {
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(node => {
            if(isElementNode(node)) {
                this.compileElement(node)
                this.compile(node)
            } else {
                this.compileText(node)
            }
        })
        console.log(childNodes)

    }
}

export default Compiler