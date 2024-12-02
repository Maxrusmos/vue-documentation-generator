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
    <link rel="stylesheet" href="./style.css">
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
   
    
    <script>
    const originalTreeHTML = document.getElementById('tree-container').innerHTML;
    let debounceTimeout;
    function debounce(func, delay) {
        return function (...args) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    function openFileInIframe(filePath) {
        const iframe = document.getElementById('contentFrame');
        iframe.src = filePath; 
        const allFileLinks = document.querySelectorAll('#tree-container li a');
        allFileLinks.forEach(link => {
            link.classList.remove('selected'); 
        });

        const fileLink = Array.from(allFileLinks).find(link => {
            return link.getAttribute('href').replace(/^#/, '') === filePath; 
        });
        

        if (fileLink) {
            fileLink.classList.add('selected'); 
        }
    }

    function searchTree(query) {
        const container = document.getElementById('tree-container');
        if (!query) {
            container.innerHTML = originalTreeHTML; 
            return;
        }

        const items = Array.from(container.querySelectorAll('li'));
        const foldersToShow = new Set();

        items.forEach((item) => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(query.toLowerCase());
            const isFolder = item.querySelector('.folder-toggle');

            if (matches) {
                item.style.display = 'block';

                if (isFolder) {
                    foldersToShow.add(item);
                } else {
                    let parent = item.parentElement;
                    while (parent && parent.tagName === 'UL') {
                        parent.style.display = 'block';
                        parent = parent.previousElementSibling?.parentElement;
                    }
                }
            } else {
                item.style.display = 'none';
            }
         
        });

        foldersToShow.forEach((folder) => {
            const folderContent = folder.querySelector('.folder-content');
            if (folderContent) {
                folderContent.style.display = 'block';
                const folderToggle = folder.querySelector('.folder-toggle');
                if (folderToggle) {
                    folderToggle.textContent = folderToggle.textContent.replace('►', '▼');
                }
            }
        });
    }

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', debounce((e) => searchTree(e.target.value), 400));

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
    
    const expandButton = document.querySelector('.expand-button');
    const collapseButton = document.querySelector('.collapse-button');
    
    expandButton.addEventListener('click', expandAll);
    collapseButton.addEventListener('click', collapseAll);
    
    function expandAll() {
        const folderContents = document.querySelectorAll('.folder-content');
        const folderToggles = document.querySelectorAll('.folder-toggle');
    
        folderContents.forEach(content => {
            content.style.display = 'block';
        });
    
        folderToggles.forEach(toggle => {
            toggle.textContent = toggle.textContent.replace('►', '▼');
        });
    }
    
    function collapseAll() {
        const folderContents = document.querySelectorAll('.folder-content');
        const folderToggles = document.querySelectorAll('.folder-toggle');
    
        folderContents.forEach(content => {
            content.style.display = 'none';
        });
    
        folderToggles.forEach(toggle => {
            toggle.textContent = toggle.textContent.replace('▼', '►');
        });
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        openFileInIframe('App.html');
    });
</script>
</body>
</html>`;
        await fs.writeFile(outputFilePath, htmlContent, 'utf8');
    } catch (error) {
        console.error('Ошибка при создании HTML индекса:', error);
    }
}
