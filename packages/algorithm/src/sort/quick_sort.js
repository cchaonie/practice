/**
 * 快速排序
 * @param {*} array 
 */
function quick_sort(array) {
  let length = array.length
  if (length == 0) return;
  partition(array, 0, length - 1);
}

function partition(array, low, high) {
  if (low >= high) return;
  let pivot = array[low];
  let i = low + 1;
  let j = high;
  while(i < j) {
    while(pivot > array[i]) {
      i++;
    }
    while(pivot < array[j]) {
      j--;
    }
    if (i < j && array[i] >= pivot && array[j] <= pivot) {
      let tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      i++;
      j--;
    }
  }
  array[low] = array[j];
  array[j] = pivot;
  partition(array, low, j - 1);
  partition(array, j + 1, high);
}

module.exports = {
  quick_sort
}