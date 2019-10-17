function heap_sort(array) {
  build_heap(array);
  for (let i = 0; i < array.length; ++i) {
    delete_max(array, array.length - i);
  }
}

function sift_down(array, index, size) {
  let tmp = array[index];
  while (left_child(index) < size) {
    let maxIndex = left_child(index);
    if (maxIndex != size - 1 && array[maxIndex] < array[maxIndex + 1]) {
      ++maxIndex;
    }
    let max = array[maxIndex];
    if (tmp < max) {
      array[index] = max;
      index = maxIndex;
    } else {
      break;
    }
  }
  array[index] = tmp;
}

function delete_max(maxHeap, size) {
  let max = maxHeap[0];
  maxHeap[0] = maxHeap[size - 1];
  maxHeap[size - 1] = max;
  sift_down(maxHeap, 0, size - 1);
}

function left_child(index) {
  return 2 * index + 1;
}

function build_heap(array) {
  let len = array.length;
  for (let i = Math.floor((len - 1) / 2); i >= 0; --i) {
    sift_down(array, i, len);
  }
}

module.exports = {
  heap_sort,
  sift_down,
  delete_max,
  build_heap
}