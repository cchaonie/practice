const {
  heap_sort,
  sift_down,
  delete_max,
  build_heap
} = require("../../src/sort/heap_sort");

describe("heap_sort", () => {
  test("build_heap and delete_max", () => {
    let array = [25, 13, 95, 34, 61, 82, 49, 58, 73];
    build_heap(array);
    expect(array).toEqual([95, 73, 82, 58, 61, 25, 49, 13, 34]);
    delete_max(array, array.length);
    expect(array).toEqual([82, 73, 49, 58, 61, 25, 34, 13, 95]);
    delete_max(array, array.length - 1);
    expect(array).toEqual([73, 61, 49, 58, 13, 25, 34, 82, 95]);
    delete_max(array, array.length - 2);
    expect(array).toEqual([61, 58, 49, 34, 13, 25, 73, 82, 95]);
    delete_max(array, array.length - 3);
    expect(array).toEqual([58, 34, 49, 25, 13, 61, 73, 82, 95]);
    delete_max(array, array.length - 4);
    expect(array).toEqual([49, 34, 13, 25, 58, 61, 73, 82, 95]);
    delete_max(array, array.length - 5);
    expect(array).toEqual([34, 25, 13, 49, 58, 61, 73, 82, 95]);
    delete_max(array, array.length - 6);
    expect(array).toEqual([25, 13, 34, 49, 58, 61, 73, 82, 95]);
    delete_max(array, array.length - 7);
    expect(array).toEqual([13, 25, 34, 49, 58, 61, 73, 82, 95]);
  });
  test("no equal element", () => {
    let array = [25, 13, 95, 34, 61, 82, 49, 58, 73];
    heap_sort(array);
    let result = [13, 25, 34, 49, 58, 61, 73, 82, 95];
    expect(array).toEqual(result);
  });
  test("has eauql element", () => {
    let array = [25, 13, 58, 34, 61, 82, 49, 58, 73];
    heap_sort(array)
    let result = [13, 25, 34, 49, 58, 58, 61, 73, 82];
    expect(array).toEqual(result);
  });
});