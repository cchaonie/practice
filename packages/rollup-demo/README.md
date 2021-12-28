1. what is rollup
Rollup is a module bundler for JavaScript。
使用es6，打包成其他module format
2. installation
npm install rollup -g / npm install rollup
3. how to use
    - cli
    - js API
4. simple use cases
    - (browser: iife) rollup main.js --file bundle.js --format iife --name "myBundle"
    - (nodejs: cjs)   rollup main.js --file bundle.js --format cjs
    - (both browser and nodejs: umd) rollup main.js --file bundle.js --format umd
5. cli config file
    默认导出一个配置对象的ES module: rollup.config.js。此配置文件会被转译成cjs模块之后再`require`
    使用`.cjs`的node配置文件，或者node v13使用 `.mjs` 格式的es配置文件并且不会被转译

    ```javascript
        export default {
            input: 'src/main.js',
            output: {
                file: 'bundle.js',
                format: 'cjs'
            }
        };
    ```

    - 可以导出一个array，针对不同的入口执行不同的配置
    - 可以导出一个返回配置对象/数组的function，该函数的入参是命令行参数。使用--config为前缀可以自定义参数，如--configDebug
    - 甚至可以异步导出一个Promise，resolve得到配置对象/数组

    - 使用 rollup -c/--config rollup.config.js 来执行配置文件
    - 配置文件的优先级低于命令行参数

6. rollup js api (nodejs)
    - `rollup.rollup(inputOptions): Promise<Bundle>`
    - `bundle.generate(outputOptions)`: 生成到内存
    - `bundle.write(outputOptions)`：写入文件系统
    - `rollup.watch(watchOptions)`：监控模式运行
