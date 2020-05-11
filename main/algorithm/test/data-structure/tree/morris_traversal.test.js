const BinaryTreeNode = require("../../../src/data-structure/tree/definition").BinaryTreeNode;
const {
  pre_order_recursive,
  in_order_recursive,
  post_order_recursive,
  pre_order_iterative,
  in_order_iterative,
  post_order_iterative,
  pre_order_morris,
  in_order_morris,
  post_order_morris
} = require("../../../src/data-structure/tree/morris_traversal");

let testTree = new BinaryTreeNode(7)
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

describe("递归版本 VS 栈迭代版本", () => {
  test("前序", () => {
    expect(pre_order_recursive(testTree)).toEqual(pre_order_iterative(testTree))
  });
  test("中序", () => {
    expect(in_order_recursive(testTree)).toEqual(in_order_iterative(testTree))
  });
  test("后序", () => {
    expect(post_order_recursive(testTree)).toEqual(post_order_iterative(testTree))
  });
});

describe("递归版本 VS 莫里斯版本", () => {
  test("前序", () => {
    expect(pre_order_recursive(testTree)).toEqual(pre_order_morris(testTree))
  });
  test("中序", () => {
    expect(in_order_recursive(testTree)).toEqual(in_order_morris(testTree))
  });
  test("后序", () => {
    expect(post_order_morris(testTree)).toEqual(post_order_recursive(testTree))
  });
});