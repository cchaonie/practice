const { BinaryTreeNode } = require("./algorithm/tree/definition");

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

/**
 * 防抖，过一段时间后才会触发
 * @param {*} fn 
 */
function debounce(fn, delay = 300) {
  let timeout = null;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.call(this, arguments), delay);
  }
}

/**
 * 节流 第一次触发就需要等待delay，触发一次后一段时间内不再触发，
 * 最后一次触发后依旧会执行
 * @param {*} fn 
 */
function throttle(fn, delay = 300) {
  let canRun = true;
  return function () {
    if (!canRun) {
      return;
    }
    canRun = false;
    return setTimeout(() => {
      fn.call(this, arguments);
      canRun = true;
    }, delay);
  }
}

/**
 * 节流 第一次立即触发，触发一次后一段时间内不再触发，
 * 不触发后立即不执行
 * @param {*} fn 
 */
function throttleByTimestamp(fn, delay = 300) {
  let previous = 0;
  return function() {
    let now = + new Date();
    if (now - previous < delay) {
      fn.call(this, arguments);
      previous = now;
    }
  }
}

module.exports = {
  toStringWithNull,
  toArray,
  insertFromArray,
  layerTraversal
}