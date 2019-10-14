const { BinaryTreeNode } = require("./definition");
const { 
  toStringWithNull,
  toArray,
  insertFromArray,
 } = require("../utils");

function serialize(root) {
  if (!root) return "[]";
  let result = [],
    queue = [];
  queue.push(root);
  while (queue.length) {
    let front = queue.shift();
    if (front) {
      result.push(front.val);
      if (front.left) {
        queue.push(front.left);
      } else {
        queue.push(null);
      }
      if (front.right) {
        queue.push(front.right);
      } else {
        queue.push(null);
      }
    } else {
      result.push(null);
    }
  }
  return toStringWithNull(result);
}

function deserialize(str) {
  let array = toArray(str);
  if (!array.length) return null;
  let root = new BinaryTreeNode(array[0]),
    i = 1;
  while (i < array.length) {
    insertFromArray(root, array[i], ++i);
  }
  return root;
}

module.exports = {
  serialize,
  deserialize
}