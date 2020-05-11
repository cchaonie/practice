
class AVLTreeNode {
  height;
  key;
  left
  right
  constructor(key) {
    this.key = key;
    this.height = 0;
    this.left = null;
    this.right = null;
  }
}

export class AVLTree {
  root
  constructor() {
    this.root = null;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(root, key) {
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

  nodeHeight(root) {
    return root ? root.height : -1;
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(root, key) {
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

  rotateLL(root) {
    let temp = root.left;
    root.left = temp.right;
    temp.right = root;
    return temp;
  }

  rotateLR(root) {
    root.left = this.rotateRR(root.left);
    return this.rotateLL(root);
  }

  rotateRR(root) {
    let temp = root.right;
    root.right = temp.left;
    temp.left = root;
    return temp;
  }

  rotateRL(root) {
    root.right = this.rotateLL(root.right);
    return this.rotateRR(root);
  }

  remove(key) {}
}
