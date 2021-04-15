class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
    toArray() {
        let current = this;
        const array = [];
        while (current) {
            array.push(current.val);
            current = current.next;
        }
        return array;
    }
}

var reorderList = function (head) {
    const stackQueue = [];
    for (let current = head; current; current = current.next) {
        stackQueue.push(current);
    }
    let current = null;
    for (let i = 0; stackQueue.length > 0; i++) {
        let node = null;
        if (i % 2 === 0) {
            node = stackQueue.shift();
        } else {
            node = stackQueue.pop();
        }
        node.next = null;
        if (!current) {
            current = node;
        } else {
            current.next = node;
            current = current.next;
        }
    }
};

module.exports = {
    Node,
    reorderList,
};
