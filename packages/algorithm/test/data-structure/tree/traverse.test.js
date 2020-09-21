const {
  deepFirstTraverse,
  breadthFirstTraverse,
} = require("../../../src/data-structure/tree/traverse");
const {
  AVLTreeNode,
  insertNode,
} = require("../../../src/data-structure/tree/AVLTree");

describe("traverse", () => {
  const result = [];
  const callback = (node) => {
    console.log(node.key);
    result.push(node.key);
  };
  let root = new AVLTreeNode(40);

  beforeEach(() => {
    [1, 56, 5, 18, 99, 34].forEach((v) => (root = insertNode(root, v)));
  });

  it("deepFirstTraverse", () => {
    deepFirstTraverse(root, callback);
    expect(result).toEqual([40, 5, 1, 18, 34, 56, 99]);
  });

  it("breadthFirstTraverse", () => {
    breadthFirstTraverse(root, callback);
    expect(result).toEqual([40, 5, 56, 1, 18, 99, 34]);
  });
});
