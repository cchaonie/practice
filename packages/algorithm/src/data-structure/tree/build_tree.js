const {
  BinaryTreeNode
} = require("./definition");
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {BinaryTreeNode}
 */
function buildTreeFromPreOrderAndInOrder(preorder, inorder) {
  if (preorder.length == 0) return null;
  let root = preorder[0];
  let rootNode = null;
  rootNode = new BinaryTreeNode(root);
  let rootIndex = inorder.indexOf(root);
  let leftInOrder = inorder.slice(0, rootIndex);
  let leftPreOrder = preorder.slice(1, leftInOrder.length + 1);
  let rightInOrder = inorder.slice(rootIndex + 1);
  let rightPreOrder = preorder.slice(preorder.length - rightInOrder.length);
  rootNode.left = buildTreeFromPreOrderAndInOrder(leftPreOrder, leftInOrder);
  rootNode.right = buildTreeFromPreOrderAndInOrder(rightPreOrder, rightInOrder);
  return rootNode;
};

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {BinaryTreeNode}
 */
function buildTreeFromInOrderAndPostOrder(inorder, postorder) {
  if (postorder.length == 0) return null;
  let root = postorder[postorder.length - 1];
  let rootNode = null;
  rootNode = new BinaryTreeNode(root);
  let rootIndex = inorder.indexOf(root);
  let leftInOrder = inorder.slice(0, rootIndex);
  let leftPostOrder = postorder.slice(0, leftInOrder.length);
  let rightInOrder = inorder.slice(rootIndex + 1);
  let rightPostOrder = postorder.slice(postorder.length - rightInOrder.length - 1, postorder.length - 1);
  rootNode.left = buildTreeFromInOrderAndPostOrder(leftInOrder, leftPostOrder);
  rootNode.right = buildTreeFromInOrderAndPostOrder(rightInOrder, rightPostOrder);
  return rootNode;
};

module.exports = {
  buildTreeFromPreOrderAndInOrder,
  buildTreeFromInOrderAndPostOrder
}