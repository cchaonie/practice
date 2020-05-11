import { TreeNode, Tree } from "./Tree";

export class BinarySearchTreeNode<T> implements TreeNode<T> {
  key: T;
  left: BinarySearchTreeNode<T> | null;
  right: BinarySearchTreeNode<T> | null;
  constructor(key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T> implements Tree<T> {
  root: BinarySearchTreeNode<T> | null;
  constructor() {
    this.root = null;
  }

  search(key: T): BinarySearchTreeNode<T> | null {
    return this.searchNode(this.root, key);
  }

  searchNode(
    root: BinarySearchTreeNode<T> | null,
    key: T
  ): BinarySearchTreeNode<T> | null {
    if (root) {
      if (root.key === key) {
        return root;
      } else if (root.key > key) {
        return this.searchNode(root.left, key);
      } else {
        return this.searchNode(root.right, key);
      }
    }
    return null;
  }

  insert(key: T): void {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  
  insertNode(root: BinarySearchTreeNode<T>, key: T) {
    if (root.key > key) {
      if (!root.left) {
        root.left = new BinarySearchTreeNode(key);
      } else {
        this.insertNode(root.left, key);
      }
    } else {
      if (!root.right) {
        root.right = new BinarySearchTreeNode(key);
      } else {
        this.insertNode(root.right, key);
      }
    }
  }

  remove(key: T) {
    this.root = this.removeNode(this.root, key);
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
   * @param {BinarySearchTreeNode} t
   * @returns {BinarySearchTreeNode} 删除指定值后二叉搜索树的根节点
   */
  removeNode(
    root: BinarySearchTreeNode<T> | null,
    key: T
  ): BinarySearchTreeNode<T> | null {
    if (!root) return null;
    if (root.key === key) {
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
          root.key = current.key;
          prev.left = current.right;
        } else {
          root.key = current.key;
          root.right = null;
        }
      }
    } else if (root.key > key) {
      //当前节点大于要删除的节点，从左子树中删除
      root.left = this.removeNode(root.left, key);
    } else {
      //当前节点小于要删除的节点，从右子树中删除
      root.right = this.removeNode(root.right, key);
    }
    return root;
  }
}
