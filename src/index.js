#!/usr/bin/env node
import getVueFiles from './fileWork/getVueFiles.js';
import processVueFile from './fileWork/processVueFile.js';
import generateHTMLIndex from './generateHTML/generateHTMLIndex.js';
import fs from 'fs-extra';
import {
    srcDir,
    docsDir,
    outputPaths,
    staticFilesPaths,
    staticFilesInDocsPaths,
} from './consts/paths.js';

// копирование файлов
async function copyFile(sourcePath, targetPath) {
    try {
        await fs.copy(sourcePath, targetPath);
    } catch (err) {
        console.error(`Error copying file from ${sourcePath} to ${targetPath}:`, err);
    }
}

// Основная функция для обработки всех компонентов
async function generateDocs() {
    const vueFiles = await getVueFiles(srcDir);
    await fs.ensureDir(docsDir);
    await copyFile(staticFilesPaths.css.treePath, staticFilesInDocsPaths.css.treePath);
    await copyFile(staticFilesPaths.css.docPath, staticFilesInDocsPaths.css.docPath);
    await copyFile(staticFilesPaths.js.treePath, staticFilesInDocsPaths.js.treePath);
    for (const filePath of vueFiles) {
        await processVueFile(filePath);
    }
    console.log('Документация сгенерирована в папке docs');
    await generateHTMLIndex(docsDir, outputPaths.html);
}

await generateDocs();
