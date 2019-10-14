const { BinaryTreeNode } = require("./tree/definition");

function rmTailNull(array) {
  let len = array.length;
    if (len > 0 && array[len - 1] == null){
      array.splice(len - 1, 1);
    } else {
      return array;
    }
    return rmTailNull(array);
}

function toStringWithNull(array) {
  let tmp = rmTailNull(array).reduce((s, a) => s + a + ',', '[');
  return tmp.substring(0, tmp.length - 1) + ']';
}

function toArray(str) {
  let len = str.length;
  if (str == "[]") return [];
  return str.substring(1, len - 1).split(',').map(a => {
    if (a === "null") return null;
    else return Number(a);
  });
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
    result.push(front);
    if (front.left) queue.push(front.left);
    if (front.right) queue.push(front.right);
  }
  return result;
}

module.exports = {
  toStringWithNull,
  toArray,
  insertFromArray,
  layerTraversal
}