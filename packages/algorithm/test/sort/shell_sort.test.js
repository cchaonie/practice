const { shell_sort } = require("../../src/sort/shell_sort");

describe("quick_sort", () => {
  test("no equal element", () => {
    let array = [25, 13, 95, 34, 61, 82, 49, 58, 73];
    let result = [13, 25, 34, 49, 58, 61, 73, 82, 95];
    shell_sort(array);
    expect(array).toEqual(result);
  });
  test("has eauql element", () => {
    let array = [25, 13, 58, 34, 61, 82, 49, 58, 73];
    let result = [13, 25, 34, 49, 58, 58, 61, 73, 82];
    shell_sort(array);
    expect(array).toEqual(result);
  });
});