const { KthLargest } = require("./kth_large");

describe("KthLargest", () => {
  test ("KthLargest pass", () => {
    let k = 3;
    let arr = [4,5,8,2];
    let kthLargest = new KthLargest(k, arr);
    expect(kthLargest.data.val).toEqual(4);
    expect(kthLargest.add(3)).toEqual(4);
    expect(kthLargest.add(5)).toEqual(5);
    expect(kthLargest.add(10)).toEqual(5);
    expect(kthLargest.add(9)).toEqual(8);
    expect(kthLargest.add(4)).toEqual(8);
  })
})