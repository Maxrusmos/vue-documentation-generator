import fs from 'fs-extra';

export default async function generateFileTreeCSS(cssFilePath) {
    const cssContent = `
        .header {
            position: fixed;
            top: 0;
            left: 0;
            padding: 16px 16px 20px 16px;
            margin: 0;
            width: calc(100% - 32px);
            border-bottom: 1px solid #E7E7E7;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            background-color: #fff;
            color: #f5f5f5;
            scrollbar-gutter: stable;
            overflow: hidden
        }
        ul { list-style-type: none; padding-left: 8px; margin: 0; }
        li { margin: 4px 0; }
        a { text-decoration: none; color: #42b883; }
        a:hover { text-decoration: underline; }
        strong { color: #4CAF50; cursor: pointer; }
        .folder-toggle:before { content: ''; padding-right: 5px; }
        .folder-content { padding-left: 16px; }
        h1 { color: #42b883; margin: 0 0 8px 0; }
        #search {
            padding: 10px;
            height: 36px;
            width: 100%;
            box-sizing: border-box;
            outline: none;
            border: 1px solid #66BB6A;
            border-radius: 6px;
            background-color: transparent;
            color: #35495e;
            font-size: 18px;
        }
        .content-container {
            width: 100%;
            top: 119px;
            height: calc(100vh - 130px);
            position: absolute;
            display: flex;
            gap: 20px;
        } 
        .main-tree-container {
            height: 100%;
            min-width: 560px;
        }
        .tree-control {
            height: 60px;
        }
        .container-frame {
            height: 100%;
            overflow: hidden;
            width: 100%;
            background-color: #fff;
        }
        #contentFrame {
            width: 100%; 
            height: 100%; 
            border: none;
        }
        #tree-container {
            height: calc(100% - 21px);
            width: 100%;
            overflow: auto;
            padding: 8px 0px 8px 16px;
            box-sizing: border-box;
            background-color: #fff;
        }
        .selected {
            background-color: #42b883; 
            color: white;
        }
        #tree-container::-webkit-scrollbar {
            width: 6px;
        }
        #tree-container::-webkit-scrollbar-track {
            background-color: transparent;
        }
        #tree-container::-webkit-scrollbar-thumb {
            background: #66BB6A;
            border-radius: 3px;
        }
        #tree-container::-webkit-scrollbar-thumb:hover {
            background: #4CAF50;
        }
        
    `;
    try {
        await fs.writeFile(cssFilePath, cssContent, 'utf8');
    } catch (err) {
        console.error('Ошибка при создании CSS файла:', err);
    }
}