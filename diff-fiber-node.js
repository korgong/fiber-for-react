// diff a fiber node
class FiberNode {
    constructor(id, type, props) {
        this.id = id;
        this.type = type;
        this.props = props;
        this.child = null;
        this.sibling = null;
        this.return = null;
        this.effectTag = null; // 标记此节点的更新类型（增、删、改）
        this.alternate = null; // 上一次更新时对应的Fiber节点
    }
}

// 模拟上一次更新时的虚拟DOM树的根节点
let lastRootFiber = null;

// 用于模拟Diff过程的递归函数
function performUnitOfWork(fiber) {
    // ...（省略前面的逻辑）

    // 2. 执行Diff逻辑，并根据需要更新虚拟DOM
    const prevFiber = fiber.alternate; // 上一次更新时对应的Fiber节点
    if (prevFiber) {
        // 存在上一次更新时的Fiber节点，执行Diff算法
        diffAndUpdateFiber(fiber, prevFiber);
    } else {
        // 不存在上一次更新时的Fiber节点，说明是首次渲染，直接添加到effect list中
        fiber.effectTag = 'PLACEMENT'; // 表示需要插入到DOM中
    }

    // ...（省略后面的逻辑）
}

// 模拟Diff算法的函数
function diffAndUpdateFiber(currentFiber, prevFiber) {
    // 比较当前Fiber节点的props和上一次更新时的props，找出差异
    const propsChanged = checkPropsChanges(currentFiber.props, prevFiber.props);
    if (propsChanged) {
        currentFiber.effectTag = 'UPDATE'; // 表示需要更新DOM
    }
    // 比较当前Fiber节点的children和上一次更新时的children，找出差异
    const childrenChanged = checkChildrenChanges(currentFiber.child, prevFiber.child);
    if (childrenChanged) {
        currentFiber.effectTag = 'UPDATE'; // 表示需要更新DOM
    }
}

// 检查props是否有变化
function checkPropsChanges(newProps, oldProps) {
    // 简化逻辑：比较props是否相等
    return JSON.stringify(newProps) !== JSON.stringify(oldProps);
}

// 检查children是否有变化
function checkChildrenChanges(newChild, oldChild) {
    // 简化逻辑：比较children是否相等
    return JSON.stringify(newChild) !== JSON.stringify(oldChild);
}

// ...（其他逻辑，省略）