import { minPathSum } from "../../../src/other/dynamicProgramming/minPathSum";

describe("minPathSum", () => {
    it.only("should pass", () => {
        expect(
            minPathSum([
                [1, 3, 1],
                [1, 5, 1],
                [4, 2, 1],
            ])
        ).toBe(7);
    });
});
