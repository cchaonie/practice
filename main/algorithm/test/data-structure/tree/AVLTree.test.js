import { AVLTree } from "../../../src/data-structure/tree/AVLTree";
import { layerTraverse } from "../../../src/data-structure/tree/layerTraverse";

describe("AVLTree", () => {
    it("should insert right", () => {
        const avl = new AVLTree();
        [1, 2, 3, 4, 5, 6].forEach(n => avl.insert(n));
        expect(layerTraverse(avl.root)).toEqual([3, 2, 4, 1, 5, 6]);
    })
})