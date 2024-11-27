import path from 'path';
import fs from 'fs-extra';

// Генерация HTML индекса
export default async function generateHTMLIndex(baseDir, outputFilePath) {
    async function getFileTree(dir) {
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

    function generateHTML(tree, basePath = '') {
        let html = '<ul>';
        for (const item of tree) {
            if (item.type === 'folder') {
                html += `<li>
                        <strong class="folder-toggle" onclick="toggleFolder(this)">
                             ► ${item.name}
                        </strong>
                        <ul class="folder-content" style="display:none;">
                            ${generateHTML(item.children, path.join(basePath, item.name))}
                        </ul>
                    </li>`;
            } else if (item.type === 'file') {
                const relativePath = path.relative(baseDir, item.path).replace(/\\/g, '/');
                html += `<li><a href="${relativePath}" target="_blank">${item.name.replace('html', 'vue')}</a></li>`;
            }
        }

        html += '</ul>';
        return html;
    }

    try {
        const tree = await getFileTree(baseDir);
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation Index</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 0; margin: 0; background-color: #2b2e33; }
        ul { list-style-type: none; padding-left: 20px; }
        li { margin: 5px 0; }
        a { text-decoration: none; color: #007bff; }
        a:hover { text-decoration: underline; }
        strong { color: #ceced1; cursor: pointer; }
        .folder-toggle:before { content: ''; padding-right: 5px; }
        .folder-content { padding-left: 20px; }
        h1 { color: #f5f5f5; }
    </style>
</head>
<body>
    <h1>Documentation</h1>
    ${generateHTML(tree)}
    
    <script>
        function toggleFolder(element) {
            const folderContent = element.nextElementSibling;
            const isVisible = folderContent.style.display === 'block';
            folderContent.style.display = isVisible ? 'none' : 'block';
            if (isVisible) {
                element.textContent = element.textContent.replace('▼', '►');
            } else {
                element.textContent = element.textContent.replace('►', '▼');
            }
        }
    </script>
</body>
</html>`;
        await fs.writeFile(outputFilePath, htmlContent, 'utf8');
    } catch (error) {
        console.error('Ошибка при создании HTML индекса:', error);
    }
}
