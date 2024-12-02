#!/usr/bin/env node
import getVueFiles from './fileWork/getVueFiles.js';
import processVueFile from './fileWork/processVueFile.js';
import generateHTMLIndex from './generateHTML/generateHTMLIndex.js';
import fs from 'fs-extra';
import generateFileTreeCSS from "./cssGenerator/cssFileTreeGenerator.js";
import generateDocContentCSS from "./cssGenerator/cssDocContentGenerator.js";
import { srcDir, docsDir, outputHTML, cssFileTreePath, cssFileDocPath } from './consts/paths.js';

// Основная функция для обработки всех компонентов
async function generateDocs() {
    const vueFiles = await getVueFiles(srcDir);
    await fs.ensureDir(docsDir);
    await generateFileTreeCSS(cssFileTreePath);
    await generateDocContentCSS(cssFileDocPath);
    for (const filePath of vueFiles) {
        await processVueFile(filePath);
    }
    console.log('Документация сгенерирована в папке docs');
    await generateHTMLIndex(docsDir, outputHTML);
}

generateDocs();
