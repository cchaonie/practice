const TreeNode = require("./definition").TreeNode;
const { layerTraversal } = require("./layer_traversal");

let testTree1 = new TreeNode(1)
  .addLeft(new TreeNode(2))
  .addRight(new TreeNode(3));

let testTree2 = new TreeNode(7)
  .addLeft(new TreeNode(5)
    .addLeft(new TreeNode(3)
      .addLeft(new TreeNode(1)
        .addRight(new TreeNode(2))
      )
      .addRight(new TreeNode(4))
    )
    .addRight(new TreeNode(6))
  )
  .addRight(new TreeNode(10)
    .addLeft(new TreeNode(8)
      .addRight(new TreeNode(9))
    )
    .addRight(new TreeNode(11))
  );

  describe("层序遍历", () => {
  test("testTree1", () => {
    expect(layerTraversal(testTree1)).toEqual([1, 2, 3])
  });
  test("testTree2", () => {
    expect(layerTraversal(testTree2)).toEqual([7, 5, 10, 3, 6, 8, 11, 1, 4, 9, 2])
  });
});