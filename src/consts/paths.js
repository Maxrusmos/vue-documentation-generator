import path from 'path';
import { fileURLToPath } from 'url';

// Получаем путь текущего файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Базовые директории
const srcDir = './src';
const docsDir = './docs';

// Названия статичных файлов
const staticFilesNames = {
    css: {
        treeFileName: 'treeStyles.css',
        docFileName: 'docContentStyles.css',
    },
    js: {
        treeFileName: 'treeScript.js',
    }
};

// Пути к статичным файлам в исходной директории
const staticFilesPaths = {
    css: {
        treePath: path.resolve(__dirname, `../css/${staticFilesNames.css.treeFileName}`),
        docPath: path.resolve(__dirname, `../css/${staticFilesNames.css.docFileName}`),
    },
    js: {
        treePath: path.resolve(__dirname, `../scripts/${staticFilesNames.js.treeFileName}`),
    }
};

// Пути к статичным файлам в директории docs
const staticFilesInDocsPaths = {
    css: {
        treePath: path.join(docsDir, staticFilesNames.css.treeFileName),
        docPath: path.join(docsDir, staticFilesNames.css.docFileName),
    },
    js: {
        treePath: path.join(docsDir, staticFilesNames.js.treeFileName),
    }
};

// Пути для вывода документации
const outputPaths = {
    html: path.join(docsDir, 'index.html'),
};

// Экспортируем все необходимые константы
export {
    srcDir,
    docsDir,
    staticFilesNames,
    staticFilesPaths,
    staticFilesInDocsPaths,
    outputPaths
};
