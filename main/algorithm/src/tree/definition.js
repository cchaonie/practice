const BinarySearchTree = require("./BinarySearchTree");

function BinaryTreeNode(val) {
  this.val = val;
  this.left = this.right = this.next =  null;
}

BinaryTreeNode.prototype.addLeft = function (BinaryTreeNode) {
  this.left = BinaryTreeNode;
  return this;
}

BinaryTreeNode.prototype.addRight = function (BinaryTreeNode) {
  this.right = BinaryTreeNode;
  return this;
}

function insertFromArray(root, val, index) {
  if (val != null) {
    let depth = index / 2 | 0,
      nodeArray = layerTraversal(root);
    if (depth * 2 == index) {
      nodeArray[depth].left = new BinaryTreeNode(val);
    }
    if (depth * 2 + 1 == index) {
      nodeArray[depth].right = new BinaryTreeNode(val);
    }
  }
  return root;
}

function layerTraversal(root) {
  if (!root) return [];
  let result = [null],
    queue = [];
  queue.push(root);
  while (queue.length) {
    let front = queue.shift();
    result.push(front.val);
    if (front.left) queue.push(front.left);
    if (front.right) queue.push(front.right);
  }
  return result;
}

function binaryTreeLayerGenerator(array) {
  if (!array.length) return null;
  let root = new BinaryTreeNode(array[0]),
    i = 1;
  while (i < array.length) {
    insertFromArray(root, array[i], ++i);
  }
  return root;
}

/**
 * 使用儿子兄弟表示法 表示一棵树
 * @param {*} val 
 */
function TreeNode(val) {
  this.val = val;
  this.firstChild = null;
  this.nextSibling = null;
}

function getBSTFromArray(arr) {
  if (!Array.isArray(arr)) return null;
  let t = new BinarySearchTree();
  for (let a of arr) {
    t.insert(a);
  }
  return t;
}

function printBSTAsArray(bst) {
  console.log(layerTraversal(bst));
}

module.exports = {
  BinaryTreeNode,
  binaryTreeLayerGenerator,
  getBSTFromArray,
  printBSTAsArray,
  layerTraversal
}