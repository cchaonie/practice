# create Chinese name

A cli tool to create Chinese name.

## Install

`npm i -g ccn`

## Example

The format of parameter is like:
ccn resultCount surnameLength(optional) fullNameLength(optional)

1. `ccn 2` (create 2 names, surname will be 1 word and the full name will be 2 words by default)

```
封珊
1. 金：秀气伶俐，多才巧智，中年成功隆昌，出国之字。
冷合
1. 水：环境良好，一生清雅温和，中年励业，晚年成功隆昌。
```

2. `ccn 3 1 3` (create 3 names, surname will be 1 word and the full name will be 3 words)

```
柯认籍
1. 金：忧心劳神，病弱短寿，一生多灾，有爱情厄，晚年吉祥。
2. 木：晚婚迟得子吉，白手成家，自力更生，中年勤俭，晚年隆昌。
蔡谕黯
1. 金：胆识丰富，精明公正，官运旺，中年成功隆昌，出国之字。
2. 水：不祥之字，暗淡无光，身弱短寿，中年多灾，晚年劳神。
袁作殊
1. 金：忧心劳神，刑偶欠子，中年隆昌，晚年劳神，一生劳苦。
2. 金：有爱情厄，忧心劳神，中年有灾，晚年吉祥，不幸之字。
```

## Notes

1. Full name length must be bigger than the surname length
2. The max surname length is 5
3. The max first name length is 3

## This repo is based on [chinese-random-name](https://github.com/XadillaX/chinese-random-name), thanks to [XadillaX](https://github.com/XadillaX)
