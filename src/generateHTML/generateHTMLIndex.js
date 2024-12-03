import path from 'path';
import fs from 'fs-extra';
import getFileTree from './helpers/fileTree.js'

// Генерация HTML индекса
export default async function generateHTMLIndex(baseDir, outputFilePath) {
    function generateHTML(tree, basePath = '') {
        let html = '<ul>';
        for (const item of tree) {
            if (item.type === 'folder') {
                html += `
                    <li>
                        <strong class="folder-toggle" onclick="toggleFolder(this)">
                            ► ${item.name}
                        </strong>
                        <ul class="folder-content" style="display:none;">
                            ${generateHTML(item.children, path.join(basePath, item.name))}
                        </ul>
                    </li>`;
            } else if (item.type === 'file') {
                const relativePath = path.relative(baseDir, item.path).replace(/\\/g, '/');
                html += `<li><a href="#${relativePath}" onclick="openFileInIframe('${relativePath}')">${item.name.replace('html', 'vue')}</a></li>`;
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
    <link rel="stylesheet" href="./treeStyles.css">
</head>
<body>
    <div class="header">
        <h1>Documentation</h1>
        <input type="text" id="search" placeholder="Search..." />
    </div>
   <div class="content-container">
       <div class="main-tree-container">
            <div class="tree-control">
                <button class="expand-button">+</button>
                <button class="collapse-button">-</button>
            </div>
            <div id="tree-container">
                ${generateHTML(tree)}
            </div>
       </div>
       <div id="file-viewer" class="container-frame">
            <iframe id="contentFrame"></iframe>
       </div>
   </div>
   <script src="treeScript.js"/>
</body>
</html>`;
        await fs.writeFile(outputFilePath, htmlContent, 'utf8');
    } catch (error) {
        console.error('Ошибка при создании HTML индекса:', error);
    }
}
