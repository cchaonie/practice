import fs from "fs";
import path from "path";

export const getManifest = (type: string, filename: string) => {
    const content = fs.readFileSync(
        path.resolve(process.cwd(), `dist/${type}/${filename}.json`)
    );
    return JSON.parse(content.toString());
};
