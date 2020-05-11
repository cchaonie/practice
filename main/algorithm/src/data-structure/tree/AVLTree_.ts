import { TreeNode, Tree } from "./Tree";



class AVLTreeNode<T> implements TreeNode<T> {
  height: number;
  key: T;
  left: AVLTreeNode<T> | null;
  right: AVLTreeNode<T> | null;
  constructor(key: T) {
    this.key = key;
    this.height = 0;
    this.left = null;
    this.right = null;
  }
}

export class AVLTree<T> implements Tree<T> {
  root: AVLTreeNode<T> | null;
  constructor() {
    this.root = null;
  }

  search(key: T): AVLTreeNode<T> | null {
    return this.searchNode(this.root, key);
  }

  searchNode(root: AVLTreeNode<T> | null, key: T): AVLTreeNode<T> | null {
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

  nodeHeight(root: AVLTreeNode<T> | null): number {
    return root ? root.height : -1;
  }

  insert(key: T) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(root: AVLTreeNode<T> | null, key: T): AVLTreeNode<T> {
    debugger;
    if (!root) return new AVLTreeNode(key);
    if (root.key > key) {
      root.left = this.insertNode(root.left, key);
      if (this.nodeHeight(root.left) - this.nodeHeight(root.right) == 2) {
        if (key < root.left.key) {
          root = this.rotateLL(root);
        } else {
          root = this.rotateLR(root);
        }
      }
    } else if (root.key < key) {
      root.right = this.insertNode(root.right, key);
    } else {
      return root;
    }
    root.height =
      Math.max(this.nodeHeight(root.left), this.nodeHeight(root.left)) + 1;
    return root;
  }

  rotateLL(root: AVLTreeNode<T>): AVLTreeNode<T> {
    let temp = root.left;
    root.left = temp.right;
    temp.right = root;
    return temp;
  }

  rotateLR(root: AVLTreeNode<T>): AVLTreeNode<T> {
    root.left = this.rotateRR(root.left);
    return this.rotateLL(root);
  }

  rotateRR(root: AVLTreeNode<T>): AVLTreeNode<T> {
    let temp = root.right;
    root.right = temp.left;
    temp.left = root;
    return temp;
  }

  rotateRL(root: AVLTreeNode<T>): AVLTreeNode<T> {
    root.right = this.rotateLL(root.right);
    return this.rotateRR(root);
  }

  remove(key: T) {}
}
