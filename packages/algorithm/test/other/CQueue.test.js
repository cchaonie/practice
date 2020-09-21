const CQueue = require("../../src/other/CQueue");

describe("CQueue", () => {
  it("should pass", () => {
    var obj = new CQueue();
    const value = 10;
    obj.appendTail(value);
    var param_2 = obj.deleteHead();
    expect(param_2).toEqual(value);
    param_2 = obj.deleteHead();
    expect(param_2).toEqual(-1);
    param_2 = obj.deleteHead();
    expect(param_2).toEqual(-1);
  });
});
