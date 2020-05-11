const {
  layerTraverse,
} = require("../../../src/data-structure/tree/layerTraverse");
const {
  AVLTreeNode,
  insertNode,
  removeNode,
} = require("../../../src/data-structure/tree/AVLTree");

describe("AVLTreeNode", () => {
  it("should insert correctlly", () => {
    let avl = new AVLTreeNode(1);
    [2, 3, 4, 5, 6].forEach((n) => {
      avl = insertNode(avl, n);
    });
    expect(layerTraverse(avl)).toEqual([4, 2, 5, 1, 3, 6]);
  });

  it("should insert, then remove correctlly", () => {
    let avl = new AVLTreeNode(40);
    [10, 70, 5, 80, 50, 90].forEach((n) => {
      avl = insertNode(avl, n);
    });
    console.log(layerTraverse(avl));
    avl = removeNode(avl, 40);
    expect(layerTraverse(avl)).toEqual([50, 10, 80, 5, 70, 90]);
  });
});
