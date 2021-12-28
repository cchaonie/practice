export class BinaryTreeNode<T> {
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;
    val: T;

    constructor(val: T) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
export class BinarySearchTree<T> {
    root: BinaryTreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    public insert(val: T) {
        if (this.root) {
            this.insertNode(this.root, val);
        } else {
            this.root = new BinaryTreeNode(val);
        }
    }

    /**
     * 增加新元素
     * 根据二叉搜索树的特点：左子节点的值小于当前节点的值同时右子节点的值大于当前节点的值，同时左子树和右子树也是一颗二叉搜索树
     * 故采用递归的方式去考虑：
     * 基准情形：当前节点没有左子节点，且待插入的节点值小于当前节点，则将当前节点的左子节点指向待插入节点；当前节点没有右子节点的情况类似
     * 递推情形：当前节点有左子节点，且带插入节点值小于当前节点，则将带插入节点插入到以当前节点左子节点为根的二叉搜索树
     * @param {BinaryTreeNode} root bst的根节点
     * @param {val} t
     */
    private insertNode(root: BinaryTreeNode<T>, val: T) {
        if (root.val > val) {
            if (!root.left) {
                root.left = new BinaryTreeNode(val);
            } else {
                this.insertNode(root.left, val);
            }
        } else {
            if (!root.right) {
                root.right = new BinaryTreeNode(val);
            } else {
                this.insertNode(root.right, val);
            }
        }
    }

    public search(val: T) {
        return this.searchNode(this.root, val);
    }

    private searchNode(root: BinaryTreeNode<T> | null, val: T): boolean {
        if (root) {
            if (root.val === val) {
                return true;
            } else if (root.val > val) {
                return this.searchNode(root.left, val);
            } else {
                return this.searchNode(root.right, val);
            }
        }
        return false;
    }

    public min() {
        return this.findMin(this.root);
    }

    private findMin(root: BinaryTreeNode<T> | null) {
        let current = root;
        while (current && current.left) {
            current = current.left;
        }
        return current;
    }

    public max() {
        return this.findMax(this.root);
    }

    private findMax(root: BinaryTreeNode<T> | null) {
        let current = root;
        while (current && current.right) {
            current = current.right;
        }
        return current;
    }

    public remove(val: T) {
        this.root = this.removeNode(this.root, val);
    }

    /**
     * 删除新元素
     * if 当前节点的值等于待删除节点的值 then
     *      if 目标节点有右子树 then 用右子树的最小值代替目标节点
     *      elif 目标节点有左子树 then 用左子树的最大值代替目标节点
     *      else 置空目标节点
     * elif 当前节点的值大于待删除节点的值 then
     *      在当前节点的左子树中删除待删除节点
     * else 在当前节点的右子树中删除待删除节点
     * @param {BinaryTreeNode} t
     * @returns {BinaryTreeNode} 删除指定值后二叉搜索树的根节点
     */
    private removeNode(root: BinaryTreeNode<T> | null, val: T) {
        if (!root) return null;
        if (root.val === val) {
            // 要删除的节点为当前节点
            let prev = null;
            let current = null;
            if (!root.left && !root.right) {
                // 没有左子树和右子树
                return null;
            } else if (!root.left) {
                // 仅仅没有左子树
                return root.right;
            } else if (!root.right) {
                // 仅仅没有右子树
                return root.left;
            } else {
                // 既有左子树，又有右子树
                prev = root;
                current = root.right;
                while (current && current.left) {
                    prev = current;
                    current = current.left;
                }
                if (prev != root) {
                    root.val = current.val;
                    prev.left = current.right;
                } else {
                    root.val = current.val;
                    root.right = null;
                }
            }
        } else if (root.val > val) {
            //当前节点大于要删除的节点，从左子树中删除
            root.left = this.removeNode(root.left, val);
        } else {
            //当前节点小于要删除的节点，从右子树中删除
            root.right = this.removeNode(root.right, val);
        }
        return root;
    }

    deepFirstTraversal(cb: (node: BinaryTreeNode<T>) => void) {
        this.dft(this.root, cb);
    }

    breathFirstTraversal(cb: (node: BinaryTreeNode<T>) => void) {
        this.bft(this.root, cb);
    }

    private dft(root: BinaryTreeNode<T> | null, cb: (node: BinaryTreeNode<T>) => void) {
        if (!root) return;
        let stack = [];
        let current = null;
        stack.push(root);
        while (stack.length) {
            current = stack.pop();
            if (current) {
                cb(current);
                if (current.right) {
                    stack.push(current.right);
                }
                if (current.left) {
                    stack.push(current.left);
                }
            }
        }
    }
    private bft(root: BinaryTreeNode<T> | null, cb: (node: BinaryTreeNode<T>) => void) {
        if (!root) return;
        let queue = [];
        let current = null;
        queue.push(root);
        while (queue.length) {
            current = queue.shift();
            if (current) {
                cb(current);
                if (current.left) queue.push(current.left);
                if (current.right) queue.push(current.right);
            }
        }
    }
}
