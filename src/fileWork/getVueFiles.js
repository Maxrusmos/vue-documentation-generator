import fs from "fs-extra";
import path from 'path';

// Рекурсивный поиск Vue файлов
export default async function getVueFiles(dir) {
    let vueFiles = [];
    const files = await fs.readdir(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
            const nestedFiles = await getVueFiles(fullPath);
            vueFiles = vueFiles.concat(nestedFiles);
        } else if (stat.isFile() && file.endsWith('.vue')) {
            vueFiles.push(fullPath);
        }
    }
    return vueFiles;
}
