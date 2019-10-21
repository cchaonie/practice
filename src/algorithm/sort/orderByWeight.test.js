const { orderByWeight } = require("./orderByWeight");

describe("orderByWeight", () => {
  test("1", () => {
    expect(orderByWeight("71899703 200 6 91 425 4 67407 7 96488 6 4 2 7 31064 9 7920 1 34608557 27 72 18 81"))
    .toEqual("1 2 200 4 4 6 6 7 7 18 27 72 81 9 91 425 31064 7920 67407 96488 34608557 71899703");
  })
})