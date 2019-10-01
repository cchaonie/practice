const TreeNode = require("./definition").TreeNode;
const { isSameTree } = require("./is_same_tree");

let testTree1 = new TreeNode(1)
  .addLeft(new TreeNode(2))
  .addRight(new TreeNode(3));

let testTree2 = new TreeNode(2)
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

describe("is same tree", () => {
  test("same", () => {
    expect(isSameTree(testTree1, testTree1)).toEqual(true)
  });
  test("not same", () => {
    expect(isSameTree(testTree1, testTree2)).toEqual(false)
  });
});