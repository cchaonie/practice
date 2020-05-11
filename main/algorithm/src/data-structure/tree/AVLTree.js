function AVLTreeNode(key) {
  this.key = key;
  this.left = null;
  this.right = null;
}

function searchNode(root, key) {
  if (root) {
    if (root.key === key) {
      return root;
    } else if (root.key > key) {
      return searchNode(root.left, key);
    } else {
      return searchNode(root.right, key);
    }
  }
  return null;
}

function insertNode(root, key) {
  if (!root) return new AVLTreeNode(key);
  if (root.key > key) {
    root.left = insertNode(root.left, key);
    if (getHeight(root.left) - getHeight(root.right) == 2) {
      if (key < root.left.key) {
        root = rotateLL(root);
      } else {
        root = rotateLR(root);
      }
    }
  } else if (root.key < key) {
    root.right = insertNode(root.right, key);
    if (getHeight(root.right) - getHeight(root.left) == 2) {
      if (key < root.right.key) {
        root = rotateRL(root);
      } else {
        root = rotateRR(root);
      }
    }
  }
  return root;
}

function removeNode(root, key) {
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
      // 既有左子树，又有右子树，用右子树的最小节点作为新的根节点
      prev = root;
      current = root.right;
      while (current && current.left) {
        prev = current;
        current = current.left;
      }
      if (prev != root) {
        // 右子树的左子树的最左边节点被拿走，此时只可能是右子树的右子树比左子树的高度大
        root.key = current.key;
        prev.left = current.right;

        prev = root;
        current = root.right;
        while(current) {
          if (getHeight(current.right) - getHeight(current.left) == 2) {
            prev.right = rotateRR(current);
          } else {
            prev = current;
            current = current.left;
          }
        }
      } else {
        // 根节点的右子树只有一个节点
        root.key = current.key;
        root.right = null;
        if (getHeight(root.left) - getHeight(root.right) == 2) {
          root = rotateLL(root);
        }
      }
    }
  } else if (root.key > key) {
    //当前节点大于要删除的节点，从左子树中删除
    root.left = this.removeNode(root.left, key);
  } else {
    //当前节点小于要删除的节点，从右子树中删除
    root.right = this.remove(root.right, key);
  }
  return root;
}

function rotateLL(root) {
  let temp = root.left;
  root.left = temp.right;
  temp.right = root;
  return temp;
}

function rotateLR(root) {
  root.left = this.rotateRR(root.left);
  return rotateLL(root);
}

function rotateRR(root) {
  let temp = root.right;
  root.right = temp.left;
  temp.left = root;
  return temp;
}

function rotateRL(root) {
  root.right = rotateLL(root.right);
  return rotateRR(root);
}

function getHeight(root) {
  if (!root) return -1;
  if (!root.left && !root.right) return 0;
  return 1 + Math.max(getHeight(root.left), getHeight(root.right));
}

module.exports = {
  AVLTreeNode,
  searchNode,
  insertNode,
  removeNode
};
