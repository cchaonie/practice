import { isBipartite } from "../../../src/data-structure/graph/isBipartite";

describe("isBipartite", () => {
    it("should pass", () => {
        expect(
            isBipartite([
                [1, 3],
                [0, 2],
                [1, 3],
                [0, 2],
            ])
        ).toBe(true);
    });
    it("should pass", () => {
        expect(
            isBipartite([
                [1, 2, 3],
                [0, 2],
                [0, 1, 3],
                [0, 2],
            ])
        ).toBe(false);
    });
});
