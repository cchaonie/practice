class DemoPlugin {
    constructor(options) {
        this.options = options;
        this.name = "DemoPlugin";
    }

    apply(compiler) {
        compiler.hooks.compile.tap(this.name, (compilation, callback) => {
            for (const key of Object.keys(compilation)) {
                console.log(`typeof ${key}: ${typeof compilation[key]}`);
                if (typeof compilation[key] === "string") {
                    console.log(compilation[key]);
                }
            }
            // callback();
        });
    }
}

module.exports = DemoPlugin;
