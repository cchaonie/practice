const findKthLargest = require("../../src/search/findKthLargest");

describe("findKthLargest", () => {
    it("should pass", () => {
        expect(findKthLargest([3,2,1,5,6,4], 2)).toEqual(5);
    })
})