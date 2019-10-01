var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

function flat(array){
  let set = new Set();
  const addToSet = (arr, s) => {
    for (let item of arr) {
      if (Array.isArray(item)) {
        s = addToSet(item, s);
      } else {
        s.add(item);
      }
    }
    return s;
  }
  return [...addToSet(array, set)];
}

console.log(flat(arr))