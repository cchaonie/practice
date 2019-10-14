const BinaryTreeNode = require("./definition").BinaryTreeNode;
const { isSameTree } = require("./is_same_tree");

let testTree1 = new BinaryTreeNode(1)
  .addLeft(new BinaryTreeNode(2))
  .addRight(new BinaryTreeNode(3));

let testTree2 = new BinaryTreeNode(2)
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

describe("is same tree", () => {
  test("same", () => {
    expect(isSameTree(testTree1, testTree1)).toEqual(true)
  });
  test("not same", () => {
    expect(isSameTree(testTree1, testTree2)).toEqual(false)
  });
});