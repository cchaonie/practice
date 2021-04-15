const { accumulateInto } = require("./accumulateInto");


describe("accumulateInto", () => {
  test("null, {b:2}", () => {
    expect(accumulateInto(null, {b:2})).toEqual({b:2});
  });
  test("[{a: 1}], [{b:2}]", () => {
    expect(accumulateInto([{a: 1}], [{b:2}])).toEqual([{a: 1}, {b:2}]);
  });
  test("[{a: 1}], {b:2}", () => {
    expect(accumulateInto([{a: 1}], {b:2})).toEqual([{a: 1}, {b:2}]);
  });
  test("{a: 1}, {b:2}", () => {
    expect(accumulateInto({a: 1}, [{b:2}])).toEqual([{a: 1}, {b:2}]);
  });
  test("{a: 1}, {b:2}", () => {
    expect(accumulateInto({a: 1}, {b:2})).toEqual([{a: 1}, {b:2}]);
  });
});