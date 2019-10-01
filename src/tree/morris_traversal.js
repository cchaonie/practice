/**
 *  Morris遍历法：为叶子结点添加线索，分别指向前驱和后继节点，其空间复杂度为O(n)
 */

// 递归版本
function pre_order_recursive(root) {
  if (!root) return [];
  let result = [];
  result.push(root.val);
  if (root.left) result = result.concat(pre_order_recursive(root.left));
  if (root.right) result = result.concat(pre_order_recursive(root.right));
  return result;
}

function in_order_recursive(root) {
  if (!root) return [];
  let result = [];
  if (root.left) result = result.concat(in_order_recursive(root.left));
  result.push(root.val);
  if (root.right) result = result.concat(in_order_recursive(root.right));
  return result;
}

function post_order_recursive(root) {
  if (!root) return [];
  let result = [];
  if (root.left) result = result.concat(post_order_recursive(root.left));
  if (root.right) result = result.concat(post_order_recursive(root.right));
  result.push(root.val);
  return result;
}

// 使用栈迭代版本
function pre_order_iterative(root) {
  if (!root) return [];
  let stack = [],
    result = [];
  while (root || stack.length) {
    while (root) {
      result.push(root.val);
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    root = root.right;
  }
  return result;
}

function in_order_iterative(root) {
  if (!root) return [];
  let stack = [],
    result = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    result.push(root.val);
    root = root.right;
  }
  return result;
}

function post_order_iterative(root) {
  if (!root) return [];
  let stack = [],
    pre = null,
    result = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (!root.right || root.right == pre) {
      result.push(root.val);
      pre = root;
      root = null;
    } else {
      stack.push(root);
      root = root.right;
    }
  }
  return result;
}

// Morris版本
function pre_order_morris(root) {
  if (!root) return [];
  let result = [],
    current = root,
    next = null;
  while (current) {
    if (current.left) {
      next = current.left;
      while (next.right && next.right != current) {
        next = next.right;
      }
      if (!next.right) {
        result.push(current.val);
        next.right = current;
        current = current.left;
      } else {
        next.right = null;
        current = current.right;
      }
    } else {
      result.push(current.val);
      current = current.right;
    }
  }
  return result;
}

function in_order_morris(root) {
  if (!root) return [];
  let result = [],
    current = root,
    next = null;
  while (current) {
    if (current.left) {
      next = current.left;
      while (next.right && next.right != current) {
        next = next.right;
      }
      if (!next.right) {
        next.right = current;
        current = current.left;
      } else {
        result.push(current.val);
        next.right = null;
        current = current.right;
      }
    } else {
      result.push(current.val);
      current = current.right;
    }
  }
  return result;
}

function post_order_morris(root) {
  if (!root) return [];
  let result = [],
    current = root,
    next = null;
  while (current) {
    if (current.left) {
      next = current.left;
      while (next.right && next.right != current) {
        next = next.right;
      }
      if (!next.right) {
        next.right = current;
        current = current.left;
      } else {
        next.right = null;
        result = result.concat(get_right_child(current.left));
        current = current.right;
      }
    } else {
      current = current.right;
    }
  }
  result = result.concat(get_right_child(root));
  return result;
}

const reverse = root => {
  let prev = null,
    next = null;
  while (root) {
    next = root.right;
    root.right = prev;
    prev = root;
    root = next;
  }
  return prev;
}

const get_right_child = root => {
  if (!root) return [];
  let reversed = reverse(root);
  let p = reversed;
  let result = [];
  while (p) {
    result.push(p.val);
    p = p.right;
  }
  reverse(reversed);
  return result;
}

module.exports = {
  pre_order_recursive,
  in_order_recursive,
  post_order_recursive,
  pre_order_iterative,
  in_order_iterative,
  post_order_iterative,
  pre_order_morris,
  in_order_morris,
  post_order_morris
}