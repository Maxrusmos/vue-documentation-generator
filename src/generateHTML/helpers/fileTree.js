import fs from 'fs-extra';
import path from 'path';

export default async function getFileTree(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const result = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            result.push({
                name: entry.name,
                type: 'folder',
                children: await getFileTree(fullPath),
            });
        } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
            result.push({
                name: entry.name,
                type: 'file',
                path: fullPath,
            });
        }
    }

    return result;
}
