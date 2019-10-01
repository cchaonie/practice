function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

TreeNode.prototype.addLeft = function (treeNode) {
  this.left = treeNode;
  return this;
}

TreeNode.prototype.addRight = function (treeNode) {
  this.right = treeNode;
  return this;
}

TreeNode.prototype.insertFromArray = function (val, index) {
  if (val) {
    let depth = index / 2 | 0,
      nodeArray = layerTraversal(this);
    if (depth * 2 == index) {
      nodeArray[depth].left = new TreeNode(val);
    }
    if (depth * 2 + 1 == index) {
      nodeArray[depth].right = new TreeNode(val);
    }
  }
  return this;
}

function layerTraversal(root) {
  if (!root) return [];
  let result = [null],
    queue = [];
  queue.push(root);
  while (queue.length) {
    let front = queue.shift();
    result.push(front);
    if (front.left) queue.push(front.left);
    if (front.right) queue.push(front.right);
  }
  return result;
}

function binaryTreeLayerGenerator(array) {
  if (!array.length) return null;
  let root = new TreeNode(array[0]),
    i = 1;
  while (i < array.length) {
    root.insertFromArray(array[i], ++i);
  }
  return root;
}

module.exports = {
  TreeNode,
  binaryTreeLayerGenerator
}