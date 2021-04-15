const { reorderList, Node } = require("../../src/other/reorderList");

describe("reorderList", () => {
    it("should pass", () => {
        const one = new Node(1);
        const two = new Node(2);
        const three = new Node(3);
        const four = new Node(4);
        one.next = two;
        two.next = three;
        three.next = four;
        reorderList(one);
        // one.next = four;
        // four.next = two;
        // two.next = three;
        // three.next = null;
        expect(one.toArray()).toEqual([1, 4, 2, 3]);
    });
});
