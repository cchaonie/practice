import { lengthOfLIS } from "../../../src/other/dynamicProgramming/lengthOfLIS";

describe("lengthOfLIS", () => {
    it("should pass", () => {
        expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
        // 0   1  2  3  4  5   6   7
        // 10, 9, 2, 5, 3, 7, 101, 18
        // 2, 4, 3, 5, 1, 0,   7,  6
        // 2, 3, 5, 7, 9, 10, 18, 101
    });
});
