import { insert } from "../../src/other/insert";

describe("insert", () => {
    it("case 1", () => {
        expect(
            insert(
                [
                    [1, 2],
                    [3, 5],
                    [6, 7],
                    [8, 10],
                    [12, 16],
                ],
                [4, 8],
            ),
        ).toEqual([
            [1, 2],
            [3, 10],
            [12, 16],
        ]);
    });
});
