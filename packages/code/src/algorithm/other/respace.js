/**
 * return the number of words of sentence but not in dictionary
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {number}
 */
function respace(dictionary, sentence) {
  const dp = [];
  for (let i = 0; i < sentence.length; ++i) {
    let unmatchCount = dp[i - 1] ? dp[i - 1] + 1 : i + 1;
    for (let j = i; j >= 0; --j) {
      const subSentence = sentence.substring(j, i + 1);
      if (dictionary.includes(subSentence)) {
        unmatchCount = Math.min(dp[i - 1], unmatchCount - subSentence.length);
      }
    }
    dp[i] = unmatchCount;
  }
  return dp[sentence.length - 1];
}

module.exports = respace;
