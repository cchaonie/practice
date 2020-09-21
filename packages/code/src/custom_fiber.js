class Node {
  constructor(instance) {
    this.instance = instance;
    this.child = null;
    this.sibling = null;
    this.return = null;
  }
}


const a1 = {
  name: 'a1'
};
const b1 = {
  name: 'b1'
};
const b2 = {
  name: 'b2'
};
const b3 = {
  name: 'b3'
};
const c1 = {
  name: 'c1'
};
const c2 = {
  name: 'c2'
};
const d1 = {
  name: 'd1'
};
const d2 = {
  name: 'd2'
};

a1.render = () => [b1, b2, b3];
b1.render = () => [];
b2.render = () => [c1];
b3.render = () => [c2];
c1.render = () => [d1, d2];
c2.render = () => [];
d1.render = () => [];
d2.render = () => [];


function link(parent, elements) {
  if (elements === null) elements = [];

  parent.child = elements.reduceRight((previous, current) => {
    const node = new Node(current);
    node.return = parent;
    node.sibling = previous;
    return node;
  }, null);

  return parent.child;
}

function doWork(node) {
  console.log(node.instance.name);
  const children = node.instance.render();
  return link(node, children);
}

/**
 * 前序、深度优先遍历
 * @param {*} o 
 */
function walk(o) {
  let root = o;
  let current = o;

  while (true) {
    // perform work for a node, retrieve & link the children
    let child = doWork(current);

    // if there's a child, set it as the current active node
    if (child) {
      current = child;
      continue;
    }

    // if we've returned to the top, exit the function
    if (current === root) {
      return;
    }

    // keep going up until we find the sibling
    while (!current.sibling) {

      // if we've returned to the top, exit the function
      if (!current.return || current.return === root) {
        return;
      }

      // set the parent as the current active node
      current = current.return;
    }

    // if found, set the sibling as the current active node
    current = current.sibling;
  }
}

walk(new Node(a1));