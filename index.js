// reconciliation which can pause, resume, and abort
class FiberNode {
    constructor(id, type, props) {
        this.id = id;
        this.type = type;
        this.props = props;
        this.child = null;
        this.sibling = null;
        this.return = null;
    }
}
// 全局变量，表示当前正在执行的Fiber节点
let currentFiber = null;
// 用于模拟Diff过程的递归函数
function performUnitOfWork(fiber) {
    // 1. 更新当前正在执行的Fiber节点
    currentFiber = fiber;
    // 2. 执行Diff逻辑，并根据需要更新虚拟DOM
    console.log('Performing work on fiber:', fiber);
    // 3. 判断是否需要终止Diff过程
    if (shouldAbort(fiber)) {
        console.log('Aborting diff process.');
        return null;
    }
    // 4. 递归处理子节点
    if (fiber.child) {
        return fiber.child;
    }
    // 5. 没有子节点，则递归处理兄弟节点
    while (fiber) {
        if (fiber.sibling) {
            return fiber.sibling;
        }
        fiber = fiber.return;
    }
    // 6. 没有兄弟节点或父节点，Diff过程完成
    console.log('Diff process completed.');
    return null;
}
// 模拟Diff过程终止条件的函数
function shouldAbort(fiber) {
    // 假设某个条件满足时，终止Diff过程
    return false;
}
// 用于开始Diff过程的函数
function startDiff() {
    // 假设我们有一个根Fiber节点作为入口
    const rootFiber = new FiberNode(1, 'div', { key: 'root' });
    let nextFiber = rootFiber;
    // 开始Diff过程
    function diff(idleDeadline) {
        if (idleDeadline.timeRemaining() > 0 && nextFiber) {
            nextFiber = performUnitOfWork(nextFiber);
        }
        nextFiber && window.requestIdleCallback(diff);
    }
    window.requestIdleCallback(diff);
}
// 示例调用startDiff函数来开始Diff过程
startDiff();