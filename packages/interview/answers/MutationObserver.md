# MutationObverver

## 使用方式

1. new MutationObserver((mutationList: MutationRecord[], observer) => any)

2. observerOption(配置项默认值都是true)
    1. subtree: boolean
    2. childList: boolean
    3. attributes: boolean
    4. attributeFilter: string[]
    5. attributeOldValue: boolean
    6. characterData: boolean
    7. characterDataOldValue: boolean. 如果这个设置为true，那么characterData也自动为true

```js
const observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);
// some time later
observer.disconnect();
```
