import { kClosest } from "../../../src/data-structure/stack/kClosest";

describe("kClosest", () => {
    it("case 1", () => {
        expect(
            kClosest(
                [
                    [3, 3],
                    [5, -1],
                    [-2, 4],
                ],
                1,
            ),
        ).toEqual([[3, 3]]);
    });

    it("case 2", () => {
        expect(
            kClosest(
                [
                    [3, 3],
                    [5, -1],
                    [-2, 4],
                ],
                2,
            ),
        ).toEqual([
            [-2, 4],
            [3, 3],
        ]);
    });

    it("case 3", () => {
        expect(
            kClosest(
                [
                    [3, 3],
                    [5, -1],
                    [-2, 4],
                ],
                3,
            ),
        ).toEqual([
            [5, -1],
            [-2, 4],
            [3, 3],
        ]);
    });
    it("case 4", () => {
        expect(kClosest([], 3)).toEqual([]);
    });
});
