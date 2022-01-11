const fs = require("fs");
const path = require("path");

let cache = null;

function prepareNamesMap() {
    if (!cache) {
        try {
            const words = fs.readFileSync(
                path.resolve(__dirname, "../dict/words.txt"),
                {
                    encoding: "utf-8",
                }
            );
            console.log("[name-creator]: Read words dict file done");
            // console.log(words);
            const dict = words.split(" \n").map(d => d.split(" "));
            console.log(dict);

            var properties = ["金", "水", "木", "火", "土"];

            var names = {
                金: [],
                木: [],
                水: [],
                火: [],
                土: [],
            };

            names = dict.reduce((names, n) => {
                if (n.length === 1 && n[0] === "") return names;
                names[n[2].split("：")[0]].push({ [n[1]]: n[2].split("：")[1] });

                return names;
            }, names);

            cache = names;
        } catch (error) {
            console.error("[name-creator]: Read words dict file failed");
        }
    }
    return cache;
}

prepareNamesMap();

console.log(cache);

module.exports = cache;
