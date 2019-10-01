function curry(a) {
  return b => c => a + b - c
}

console.log(curry(5)(3)(2))