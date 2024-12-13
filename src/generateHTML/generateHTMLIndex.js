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
    </div>
    
    <div class="content-container">
        <div class="main-tree-container">
            <div class="tree-control">
                <input type="text" id="search" placeholder="Search..." />
                <div class="v-line"></div>
                <button class="expand-button">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24" height="24" viewBox="0 0 512.000000 512.000000" >
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#42b883" stroke="none">
                            <path d="M963 5105 c-29 -8 -72 -24 -95 -36 -58 -29 -140 -109 -171 -167 -58 -107 -57 -82 -57 -1107 0 -917 1 -941 20 -972 11 -18 32 -36 47 -40 15 -5 854 -8 1863 -8 1472 0 1839 3 1857 13 54 30 54 26 51 637 l-3 565 -563 562 -562 563 -1168 2 c-981 2 -1175 0 -1219 -12z m2804 -697 c189 -189 343 -346 343 -350 0 -13 -500 -9 -545 3 -25 7 -58 29 -86 58 -29 28 -51 61 -58 86 -12 45 -16 545 -4 545 5 0 162 -154 350 -342z m-1158 -582 c41 -21 370 -465 377 -508 12 -71 -72 -137 -144 -112 -18 6 -67 62 -152 176 -69 92 -127 167 -130 167 -3 0 -57 -70 -120 -155 -63 -86 -126 -164 -139 -175 -29 -23 -88 -25 -119 -3 -33 23 -55 72 -48 107 8 38 340 483 375 502 34 18 65 19 100 1z"/>
                            <path d="M712 2339 c-20 -6 -40 -22 -52 -42 -19 -31 -20 -56 -20 -972 0 -1011 -1 -996 51 -1097 29 -58 110 -140 167 -171 110 -60 24 -57 1702 -57 1656 0 1588 -2 1692 51 58 29 140 110 171 167 58 107 57 82 57 1107 0 913 -1 941 -20 972 -13 21 -31 35 -57 42 -50 14 -3643 14 -3691 0z m1589 -438 c13 -11 76 -89 139 -175 63 -85 117 -155 120 -155 3 0 57 70 120 155 63 86 126 164 139 175 29 23 88 25 119 3 33 -23 55 -71 48 -108 -4 -19 -76 -123 -184 -266 -147 -195 -183 -236 -209 -244 -72 -20 -84 -9 -275 244 -108 143 -180 247 -184 266 -7 37 15 85 48 108 31 22 90 20 119 -3z"/>
                        </g>
                    </svg>
                </button>
                <div class="v-line"></div>
                <button class="collapse-button">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24" height="24" viewBox="0 0 512.000000 512.000000">
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#42b883" stroke="none">
                            <path d="M963 5105 c-29 -8 -72 -24 -95 -36 -58 -29 -140 -109 -171 -167 -59 -108 -57 -72 -57 -1210 0 -1145 -3 -1084 60 -1117 26 -13 243 -15 1860 -15 2013 0 1872 -4 1905 60 14 26 15 113 13 700 l-3 670 -563 562 -562 563 -1168 2 c-981 2 -1175 0 -1219 -12z m2804 -697 c189 -189 343 -346 343 -350 0 -13 -500 -9 -545 3 -25 7 -58 29 -86 58 -29 28 -51 61 -58 86 -12 45 -16 545 -4 545 5 0 162 -154 350 -342z m-1480 -1013 c12 -9 77 -85 144 -170 66 -85 124 -155 129 -155 4 0 58 68 120 150 62 83 124 160 138 170 57 45 154 8 168 -65 5 -31 -8 -72 -27 -85 -5 -3 -81 -102 -169 -220 -179 -240 -203 -261 -270 -241 -34 10 -56 36 -208 239 -93 125 -175 238 -182 251 -43 83 79 181 157 126z"/>
                            <path d="M712 2339 c-20 -6 -40 -22 -52 -42 -19 -31 -20 -56 -20 -972 0 -1011 -1 -996 51 -1097 29 -58 110 -140 167 -171 110 -60 24 -57 1702 -57 1656 0 1588 -2 1692 51 58 29 140 110 171 167 58 107 57 82 57 1107 0 913 -1 941 -20 972 -13 21 -31 35 -57 42 -50 14 -3643 14 -3691 0z m1906 -225 c34 -23 353 -452 364 -489 24 -77 -53 -150 -133 -126 -32 10 -54 34 -160 176 -68 91 -126 165 -129 165 -3 0 -61 -74 -129 -165 -106 -142 -128 -166 -160 -176 -80 -24 -157 49 -133 126 11 37 330 466 364 489 29 21 87 21 116 0z"/>
                        </g>
                    </svg>
                </button>
            </div>
            <div id="tree-container">
                <div class="tree-container-block"> ${generateHTML(tree)}</div>
                 <div id="resizer"></div>
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
