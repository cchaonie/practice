function shell_sort(array) {
  let length = array.length;
  let gap = Math.floor(length / 2);
  while (gap > 0) {
    for (let i = gap; i < length; i++) {
      let tmp = array[i];
      let j;
      for (j = i; j >= gap; j -= gap) {
        if (tmp < array[j - gap]) {
          array[j] = array[j - gap];
        } else {
          break;
        }
      }
      array[j] = tmp;
    }
    gap = Math.floor(gap / 2);
  }
}

module.exports = {
  shell_sort
}