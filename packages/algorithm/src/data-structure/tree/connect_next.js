function connect_next_with_queue(root) {
  if (!root) return null;
  let queue = [],
    pre = null;
  queue.push(root);
  while (queue.length > 0) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      if (i === 0) pre = null;
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      if (pre) {
        pre.next = node;
      }
      pre = node;
    }
  }
  return root;
}

function connect_perfect_binary_tree_next(root) {
  if (!root) return null;
  let cur = null,
    first = root;
  while (first) {
    cur = first;
    while(cur) {
      if (cur.left) {
        cur.left.next = cur.right;
      } else {
        break;
      }
      if (cur.next) {
        cur.right.next = cur.next.left;
      }
      cur = cur.next;
    }
    first = first.left;
  }
  return root;
}

function connect_inperfect_binary_tree_next(root) {
  if (!root) return null;
  let cur = null,
    first = root;
  while (first) {
    cur = first;
    while(cur) {
      if (cur.left) {
        cur.left.next = cur.right;
      } else {
        break;
      }
      if (cur.next) {
        cur.right.next = cur.next.left;
      }
      cur = cur.next;
    }
    first = first.left;
  }
  return root;
}

module.exports = {
  connect_next_with_queue,
  connect_perfect_binary_tree_next,
  connect_inperfect_binary_tree_next
}