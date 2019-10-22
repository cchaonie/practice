const { binaryTreeLayerGenerator } = require("./tree/definition");
const { 
  toStringWithNull,
  toArray,
  insertFromArray,
  layerTraversal 
} = require("./utils");

describe("utils", () => {
  test("toArray", () => {
    expect(toArray("[1,2,3,null,null,4,5]")).toEqual([1,2,3,null,null,4,5]);
  });
  // test("toArray: []", () => {
  //   expect(toArray("[]")).toEqual([]);
  // });
  // test("toArray: [1]", () => {
  //   expect(toArray("[1]")).toEqual([1]);
  // });
});