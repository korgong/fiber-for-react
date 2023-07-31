// 如何生成fiber tree
class FiberNode {
    constructor(id, type, props) {
        this.id = id;
        this.type = type;
        this.props = props;
        this.child = null;
        this.sibling = null;
        this.return = null;
        this.alternate = null; // 用于保存上一次更新时的对应Fiber节点
    }
}
// 全局变量，表示当前正在执行的Fiber节点
let currentFiber = null;
// 用于构建新的Fiber树的递归函数
function buildNewFiberTree(element, parentFiber) {
    const newFiber = new FiberNode(element.id, element.type, element.props);
    newFiber.return = parentFiber;
    // 复用旧的Fiber节点，如果存在的话
    const oldFiber = parentFiber.alternate && parentFiber.alternate.child;
    if (oldFiber) {
        let oldChild = oldFiber;
        let prevNewFiber = null;
        while (oldChild) {
            // 复用旧的Fiber节点，并更新props
            const newChild = new FiberNode(oldChild.id, oldChild.type, oldChild.props);
            newChild.return = newFiber;
            if (prevNewFiber) {
                prevNewFiber.sibling = newChild;
            } else {
                newFiber.child = newChild;
            }
            prevNewFiber = newChild;
            oldChild = oldChild.sibling;
        }
    }
    // 递归处理子元素
    const children = element.children || [];
    let prevChildFiber = null;
    children.forEach(child => {
        const childFiber = buildNewFiberTree(child, newFiber);
        if (prevChildFiber) {
            prevChildFiber.sibling = childFiber;
        } else {
            newFiber.child = childFiber;
        }
        prevChildFiber = childFiber;
    });
    return newFiber;
}
// 示例调用buildNewFiberTree函数来构建新的Fiber树
const rootElement = {
    id: 1,
    type: 'div',
    props: { key: 'root' },
    children: [
        { id: 2, type: 'h1', props: { key: 'heading' } },
        { id: 3, type: 'p', props: { key: 'paragraph' } }
    ]
};
const newRootFiber = buildNewFiberTree(rootElement, null);