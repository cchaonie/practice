const { binaryTreeLayerGenerator } = require("./definition");
const { is_balanced } = require("./is_balanced");

describe("is_balanced", () => {
  test("yes", () => {
    let t = binaryTreeLayerGenerator([3,9,20,null,null,15,7]);
    expect(is_balanced(t)).toEqual(true)
  });
  test("not", () => {
    let t = binaryTreeLayerGenerator([3,9,20,null,null,15,7,3]);
    expect(is_balanced(t)).toEqual(false)
  });
});