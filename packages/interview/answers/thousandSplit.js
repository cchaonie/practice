/**
 * use RegExp
 */
function splitNumberStr(numStr) {
  const source = numStr.split(".");
  source[0] = source[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  if (source.length > 1) {
    return source.join(".");
  }
  return source[0];
}

/**
 * non RegExp
 */
function toThousands(num) {
  let [integer, decimal] = String.prototype.split.call(num, ".");
  integer = (integer || 0).toString();
  let result = "";
  while (integer.length > 3) {
    result = "," + integer.slice(-3) + result;
    integer = integer.slice(0, integer.length - 3);
  }
  if (integer) {
    result = integer + result;
  }
  return `${result}${decimal ? "." + decimal : ""}`;
}
