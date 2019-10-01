const TreeNode = require("./definition").TreeNode;
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
} = require("./morris_traversal");

let testTree = new TreeNode(7)
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