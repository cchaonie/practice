/**
 * 罗马数字规则：
 * 1. 数位本身没有意义，只表示数字本身
 * 2. 没有0
 * 3. 使用7个符号 I(1) V(5) X(10) L(50) C(100) D(500) M(1000) 来计数
 * 4. 将并排的数字加起来，就是所表示的数
 * 4.1 右加左减
 * 4.2 左减只能是一位，且只能是 I X C 之一，且左减不可跨越数位。如 99 不可以用IC，只能是XCIX
 * 4.3 右加不可连续超过三位。如14 不可以是 XIIII 只能是 XIV
 * 5. 数字上方加一条横线或者下标M，表示乘以1000
 * @description 检查输入罗马数字是否有效，若无效，返回从右向左第一个无效字符，若有效，返回十进制数字
 * @param {*} number
 */
function checkRomanNumber(RomanNumber) {
  /**
   * 定位非法罗马字符，这里仅仅判断输入是否包括规定7种以外的字符
   * @param {*} RomanNumber
   */
  function locateIllegalRomanNumber(RomanNumber) {
    return RomanNumber.match(/[^IVXLCDM]/g);
  }
  const ruleMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const location = locateIllegalRomanNumber(RomanNumber);
  if (!location) {
    let result = 0;
    for (let i = 0; i < RomanNumber.length; i++) {
      if (
        ruleMap[RomanNumber.charAt(i)] >= ruleMap[RomanNumber.charAt(i + 1)] ||
        i === RomanNumber.length - 1
      ) {
        result += ruleMap[RomanNumber.charAt(i)];
      } else {
        result -= ruleMap[RomanNumber.charAt(i)];
      }
    }
    return result;
  }
  return location[location.length - 1];
}

/**
 * @description 根据个人信息和当前日期，返回最低票价。判断条件过于复杂，无法完整实现，这里仅做“示意”
 * @param {*} personInfo
 * @param {*} date
 */
function calculateTicketPrice(personInfo, date) {
  const TICKET_PRICE = 120;
  // 判断是否是法定节假日，这里就取个0~11之间随机数，判断是否小于3，其他类似
  const isLegalHoliday = (date) => Math.floor(Math.random() * 12) < 3;
  const isChildrensDay = (date) => Math.floor(Math.random() * 12) === 6;
  const isWomensDay = (date) => Math.floor(Math.random() * 12) === 3;
  const isMonday = (date) => Math.floor(Math.random() * 7) === 1;
  const isFemale = (info) => info.gender === "F";
  const isStudent = (info) => info.identity === "STUDENT";
  const isBringChildren = (info) => info.isBringChildren;
  let discountRate = 1;
  if (personInfo.age < 6) {
    discountRate = 0;
  } else if (personInfo.age < 12) {
    discountRate = 1 / 3;
    if (isChildrensDay(date)) {
      discountRate = 0;
    }
  } else if (personInfo.age < 17) {
    discountRate = 0.5;
  } else if (personInfo.age < 59) {
    discountRate = 1;
    if (personInfo.age < 22 && isStudent(personInfo)) {
      discountRate = 0.5;
      console.log("请出示学生证");
    }
  } else if (personInfo.age < 65) {
    discountRate = 0.5;
    console.log("请出示身份证");
  } else {
    discountRate = 0;
    console.log("请出示身份证");
  }
  if (isFemale(personInfo) && isWomensDay(date)) {
    discountRate = 0;
  }
  if (isLegalHoliday(date) || isBringChildren(personInfo)) {
    discountRate = Math.min(discountRate, 0.9);
  }
  if (!isLegalHoliday(date) && isMonday(date)) {
    discountRate = Math.min(discountRate, 0.8);
  }
  return discountRate * TICKET_PRICE;
}

module.exports = {
  checkRomanNumber,
  calculateTicketPrice,
};
