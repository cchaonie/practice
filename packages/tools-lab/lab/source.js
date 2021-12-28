const { SourceMapConsumer } = require("source-map");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

class ParseError {
    constructor() {
        this._cache = new Map();
    }
    /** read source map */
    async rawSourceMap(filepath) {
        return fetch(filepath).then(res => res.text());
    }

    async stack(stack) {
        const lines = stack.split("\\n");
        const newLines = [lines[0]];
        // console.log(lines);
        for (const item of lines) {
            // console.log(item);
            if (/at.+.js:\d+:\d+\)/.test(item.trim())) {
                const arr = item.match(/\((https?:\/\/.+):(\d+):(\d+)\)/i) || [];
                if (arr.length === 4) {
                    const url = arr[1];
                    const line = Number(arr[2]);
                    const column = Number(arr[3]);
                    const filename = (url.match(/[^/]+$/) || [""])[0];
                    const res = await this.parse(url + ".map", line, column);
                    console.log(res);
                    if (res && res.source) {
                        const content = `    at ${res.name} (${[
                            res.source,
                            res.line,
                            res.column,
                        ].join(":")})`;
                        newLines.push(content);
                    } else {
                        // 未解析成功则使用原错误信息
                        newLines.push(item);
                    }
                }
            }
        }
        return newLines.join("\n");
    }

    async getSourcemap(filename) {
        const sourcemap = this._cache.get(filename);
        if (sourcemap) {
            return sourcemap;
        } else {
            const raw = await this.rawSourceMap(filename);
            this._cache.set(filename, raw);
            return raw;
        }
    }

    /** get location */
    async parse(filename, line, column) {
        const raw = await this.getSourcemap(filename);
        const consumer = await SourceMapConsumer.with(
            raw,
            null,
            consumer => consumer
        );
        return consumer.originalPositionFor({ line, column });
    }

    destroy() {
        this._cache.clear();
        this._cache = null;
    }
}

const stack = fs.readFileSync(path.resolve(__dirname, "./errorstack.txt"), {
    encoding: "utf-8",
});

const parser = new ParseError();

parser
    .stack(stack)
    .then(res => fs.writeFileSync(path.resolve(__dirname, "./result.txt"), res))
    .then(() => parser.destroy());
