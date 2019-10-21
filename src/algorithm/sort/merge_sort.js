function merge_sort(array) {
  if (array.length < 2) return array;
  let mid = Math.floor(array.length / 2);
  let left = array.slice(0, mid);
  let right = array.slice(mid);
  return merge(merge_sort(left), merge_sort(right));
}

function merge(arr1, arr2) {
  let result = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] < arr2[0]) {
      result.push(arr1.shift());
    } else {
      result.push(arr2.shift())
    }
  }
  return result.concat(arr1).concat(arr2);
}

module.exports = {
  merge_sort
}