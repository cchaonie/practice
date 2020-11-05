import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import pluginExample from "./rollupPluginExample";

export default {
    // input: "src/main.js",
    // output: [
    //     {
    //         file: "bundle.js",
    //         format: "cjs",
    //     },
    //     {
    //         file: "bundle.min.js",
    //         format: "iife",
    //         name: "version",
    //         plugins: [terser()],
    //     },
    // ],
    // plugins: [json()],
    input: "virtual-module", // resolved by our plugin
    plugins: [pluginExample()],
    output: [
        {
            file: "bundle.js",
            format: "es",
        },
    ],
};
