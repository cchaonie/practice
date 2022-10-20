import { BinaryTreeNode } from "../BinarySearchTree";

export function layerTraversal<T>(root: BinaryTreeNode<T> | null) {
    if (!root) return [];
    let result = [],
        queue: BinaryTreeNode<T>[] = [];
    queue.push(root);
    while (queue.length) {
        let front = queue.shift();
        if (front) {
            result.push(front);
            if (front.left) queue.push(front.left);
            if (front.right) queue.push(front.right);
        }
    }
    return result;
}

export function generateBSTFromArray<T>(arr: T[]) {
    if (!Array.isArray(arr)) return null;
    let t = new BinarySearchTree();
    for (let a of arr) {
        t.insert(a);
    }
    return t;
}

export function binaryTreeLayerGenerator<T>(array: T[]) {
    if (!array.length) return null;
    let root = new BinaryTreeNode(array[0]),
        i = 1;
    while (i < array.length) {
        insertFromArray(root, array[i], ++i);
    }
    return root;
}
