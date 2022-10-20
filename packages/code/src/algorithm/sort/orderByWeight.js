function orderByWeight(input) {
  let array = input.split(" ");
  let sumFn = a => a.split("").reduce((sum, c) => {
    sum = sum + parseInt(c, 10);
    return sum;
  }, 0);
  let sortFn = (a, b) => {
    let wa = sumFn(a);
    let wb = sumFn(b);
    if (wa == wb) {
      return a > b ? 1 : -1;
    } else {
      return wa - wb;
    }
  };
  return array.sort(sortFn).join(" ");
}

module.exports = {
  orderByWeight
}