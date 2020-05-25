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

});

describe("AVLTreeNode", () => {
    it("should remove correctlly when remove left child leaf node", () => {
      let avl = new AVLTreeNode(40);
      [10, 50, 60].forEach((n) => {
        avl = insertNode(avl, n);
      });
      avl = removeNode(avl, 10);
      expect(layerTraverse(avl)).toEqual([50, 40, 60]);
    });

    it("should remove correctlly when remove right child leaf node", () => {
        let avl = new AVLTreeNode(40);
        [10, 50, 5].forEach((n) => {
          avl = insertNode(avl, n);
        });
        avl = removeNode(avl, 50);
        expect(layerTraverse(avl)).toEqual([10, 5, 40]);
      });
  });
