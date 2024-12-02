import fs from 'fs-extra';

export default async function generateDocContentCSS(cssFilePath) {
    const cssContent = `
        body { 
            font-family: Arial, sans-serif; 
            padding: 0 16px 16px 0; 
            margin: 0; 
        }
        body::-webkit-scrollbar {
            width: 6px;
        }
        body::-webkit-scrollbar-track {
            background-color: transparent;
        } 
        body::-webkit-scrollbar-thumb {
            background: #66BB6A;
            border-radius: 3px;
        }
        body::-webkit-scrollbar-thumb:hover {
             background: #4CAF50;
        }
        .container-for-inner-html {
            display: flex; 
            flex-direction: column; 
            gap: 20px; 
        }
        h1 { color: #42b883; margin: 12px 0 12px 12px; font-size: 24px}
        h2 { margin: 0; font-size: 18px; text-transform: uppercase;}
        pre { background: #f5f5f5; padding: 10px; }
        code { font-family: monospace; }
        ul { list-style-type: none; padding-left: 20px; }
        table { border-collapse: collapse; width: 100%; } 
        th { text-align: left;  padding: 0px 12px 0px 12px; }
        td { 
            padding: 0 12px;  
        }
        th { font-size: 18px; }
        tr { height: 28px; width: 100%; }
        .block-header {
            display: flex; 
            justify-content: space-between;
            align-items: center;
            padding: 0 0 12px 12px;
            border-bottom: 1px solid #72747F;
            margin-bottom: 12px;
        }
        .methods-block, .props-block, .computed-block, .watchers-block {
            background-color: #292d3e;
            border-radius: 6px;
            padding: 16px;
        }
        .icon-block  {
            width: 20px;
            height: 20px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            background-color: transparent;
            border: 2px solid #4CAF50;
        }
        .methods-block .icon-block {
             border: 2px solid #1565C0;
        }
        .props-block .icon-block {
             border: 2px solid #886ed4;
        }
        .computed-block .icon-block {
             border: 2px solid #d2587e;
        }
        .watchers-block .icon-block {
             border: 2px solid #4CAF50;
        }
        .comment {
            color: #8E8E8E;
        }
    `;
    try {
        await fs.writeFile(cssFilePath, cssContent, 'utf8');
    } catch (err) {
        console.error('Ошибка при создании CSS файла:', err);
    }
}
