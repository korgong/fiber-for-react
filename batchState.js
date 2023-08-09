let updateQueue = [];
let isBatchingUpdates = false;

function batchedUpdates(fn) {
    isBatchingUpdates = true;
    fn();  // Execute the provided function (this would be where our state updates happen)
    isBatchingUpdates = false;
    flushUpdates();
}

function setState(newState) {
    if (isBatchingUpdates) {
        updateQueue.push(newState);
    } else {
        updateComponent(newState);
    }
}

function flushUpdates() {
    let nextCombinedState = Object.assign({}, ...updateQueue);
    updateComponent(nextCombinedState);
    updateQueue = [];
}

function updateComponent(newState) {
    // This is a pseudo-function where React would actually update the component.
    // In reality, React would also handle things like determining if a re-render is necessary, etc.
    console.log("Component updated with state:", newState);
}

// Usage example:
batchedUpdates(() => {
    setState({ count: 1 });
    setState({ count: 2 });
    setState({ otherProp: "hello" });
});

// Output:
// Component updated with state: { count: 2, otherProp: "hello" }
