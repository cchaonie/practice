import fs from "fs";
import path from "path";

export const getManifest = () => {
    const content = fs.readFileSync(
        path.resolve(__dirname, "../../dist/manifest.json")
    );
    return JSON.parse(content.toString());
};
