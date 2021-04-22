# BigInt

大于 `2^53 - 1`(Number.MAX_SAFE_INTEGER) 的数字

1. `typeof 1n === "bigint" // true`
2. 转换成 number 可能会有精度丢失

## 创建方法

1. 直接量：通过在数字后面添加`n`来表示
2. 构造函数：BigInt(number)，不可以使用`new`
   可以通过`Object(1n)`创建包装对象，与 Symbol 类似

## 如何在 JS 中进行精确计算小数

首先明确问题的根源，JS 中不能精确计算小数的原因在于，IEEE754 无法精确表示所有小数。因此要想精确计算小数，要先考虑的是怎么存储小数。
科学计数法解决了这个问题，任意大的小数都可以使用科学计数法表示。形如`1.23E-5`,表示`1.23*10^(-5)`, 拆解下来，一个数字包括以下几个部分：

1. 符号
2. 有效数字数组，有效数字可以拆分整数部分和小数部分
3. 指数
   按照这样划分之后，可以使用整数的运算规则处理完毕后，再将结果转换回小数即可。而且，如果数字过大无法进行数值运算，可以拆解成字符串进行计算

```js
// 注意点
// 	1. 两数相乘最大位数为两数位数之和
// 	2. 使用竖式乘法。需要注意连续进位问题
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';
  const op1 = num1.split("");
  const op2 = num2.split("");
  const result = new Array(op1.length + op2.length).fill(0);
  for (let i = op1.length - 1; i > -1; i--) {
    for (let j = op2.length - 1; j > -1; j--) {
      const idx = i + j + 1;
      const res = Number(op1[i]) * Number(op2[j]);
      const sum = res + result[idx];
      result[idx] = sum % 10;
      let p = idx - 1;
      let extra = Math.floor(sum / 10);
      while (p >= 0) {
        const currSum = result[p] + extra;
        if (currSum > 9) {
          result[p--] = currSum % 10;
          extra = Math.floor(currSum / 10);
        } else {
          result[p] = result[p] + extra;
          break;
        }
      }
    }
  }
  let firstNonZero = -1;
  for (let i = 0; i < result.length; i++) {
    if (result[i] != 0) {
      firstNonZero = i;
      break;
    }
  }
  return result.slice(firstNonZero).join("");
};


```
