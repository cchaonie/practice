class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val: number, left?: TreeNode, right?: TreeNode) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val: number, next?: ListNode) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

export const sortedListToBST = function (head: ListNode) {
    const vals = [];
    let curr: ListNode | null = head;

    while (curr) {
        vals.push(curr.val);
        curr = curr.next;
    }

    const buildTree = (arr: number[], start: number, end: number) => {
        if (start === end) {
            return new TreeNode(arr[start]);
        } else {
            const mid = (start + end) >> 1;
            let node: TreeNode;
            if (mid === start) {
                node = new TreeNode(arr[start]);
                node.right = new TreeNode(arr[end]);
            } else {
                node = new TreeNode(arr[mid]);
                node.left = buildTree(arr, start, mid - 1);
                node.right = buildTree(arr, mid + 1, end);
            }
            return node;
        }
    };
    return buildTree(vals, 0, vals.length - 1);
};
