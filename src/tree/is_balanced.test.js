const { binaryTreeLayerGenerator } = require("./definition");
const { is_balanced } = require("./is_balanced");

describe("is_balanced", () => {
  // test("yes", () => {
  //   let t = binaryTreeLayerGenerator([3,9,20,null,null,15,7]);
  //   expect(is_balanced(t)).toEqual(true)
  // });

  // test("not", () => {
  //   let t = binaryTreeLayerGenerator([3,9,20,null,null,15,7,3]);
  //   expect(is_balanced(t)).toEqual(false)
  // });
  
  test("not pass test", () => {
    let t = binaryTreeLayerGenerator([1,2,2,3,null,null,3,4,null,null,4]);
    expect(is_balanced(t)).toEqual(false)
  });
});