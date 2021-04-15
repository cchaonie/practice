const BinarySearchTree = require("../../../src/data-structure/tree/BinarySearchTree");

describe("BinarySearchTree", () => {
  let cbGene = (r) => (n) => {
    r.push(n.val);
  };

  let bst = new BinarySearchTree();
  let result = null;
  let cb = null;

  beforeAll(() => {
    [6, 3, 5, 4, 2, 9, 7, 12, 8, 13, 11].forEach((n) => {
      bst.insert(n);
    });
  });

  beforeEach(() => {
    result = [];
    cb = cbGene(result);
  });

  it("deepFirstTraversal", () => {
    bst.deepFirstTraversal(cb);
    expect(result).toEqual([6, 3, 2, 5, 4, 9, 7, 8, 12, 11, 13]);
  });

  it("breathFirstTraversal", () => {
    bst.breathFirstTraversal(cb);
    expect(result).toEqual([6, 3, 9, 2, 5, 7, 12, 4, 8, 11, 13]);
  });
});
