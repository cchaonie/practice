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



/**
 * 使用儿子兄弟表示法 表示一棵树
 * @param {*} val 
 */
function TreeNode(val) {
  this.val = val;
  this.firstChild = null;
  this.nextSibling = null;
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