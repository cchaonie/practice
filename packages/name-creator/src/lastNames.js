const fs = require("fs");
const path = require("path");

let cache = null;

function getLastNames() {
    if (!cache) {
        try {
            const firstNames = fs.readFileSync(
                path.resolve(__dirname, "../dict/last-names.txt"),
                {
                    encoding: "utf-8",
                }
            );
            console.log("[name-creator]: Read last-name dict file done");
            cache = firstNames
                .split("\n")
                .map(names => names.split(" "))
                .flat()
                .filter(Boolean);
        } catch (error) {
            console.error("[name-creator]: Read last-name dict file failed");
        }
    }
    return cache;
}

getLastNames();

module.exports = cache;
