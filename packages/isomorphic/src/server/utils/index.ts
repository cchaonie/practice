import fs from "fs";
import path from "path";

export const getManifest = (type: string) => {
    const content = fs.readFileSync(
        path.resolve(process.cwd(), `dist/${type}/manifest.json`)
    );
    return JSON.parse(content.toString());
};
