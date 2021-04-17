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