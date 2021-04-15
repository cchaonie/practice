const BinaryTreeNode = require("../../../src/data-structure/tree/definition").BinaryTreeNode;
const { layerTraversal } = require("../../../src/data-structure/tree/layer_traversal");

let testTree1 = new BinaryTreeNode(1)
  .addLeft(new BinaryTreeNode(2))
  .addRight(new BinaryTreeNode(3));

let testTree2 = new BinaryTreeNode(7)
  .addLeft(new BinaryTreeNode(5)
    .addLeft(new BinaryTreeNode(3)
      .addLeft(new BinaryTreeNode(1)
        .addRight(new BinaryTreeNode(2))
      )
      .addRight(new BinaryTreeNode(4))
    )
    .addRight(new BinaryTreeNode(6))
  )
  .addRight(new BinaryTreeNode(10)
    .addLeft(new BinaryTreeNode(8)
      .addRight(new BinaryTreeNode(9))
    )
    .addRight(new BinaryTreeNode(11))
  );

  describe("层序遍历", () => {
  test("testTree1", () => {
    expect(layerTraversal(testTree1)).toEqual([1, 2, 3])
  });
  test("testTree2", () => {
    expect(layerTraversal(testTree2)).toEqual([7, 5, 10, 3, 6, 8, 11, 1, 4, 9, 2])
  });
});