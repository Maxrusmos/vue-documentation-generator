#!/usr/bin/env node

import getVueFiles from './fileWork/getVueFiles.js';
import processVueFile from './fileWork/processVueFile.js';
import generateHTMLIndex from './generateHTML/generateHTMLIndex.js';
import fs from 'fs-extra';
import path from 'path';

const srcDir = './src';
const docsDir = './docs';
const outputHTML = path.join(docsDir, 'index.html');

// Основная функция для обработки всех компонентов
async function generateDocs() {
    const vueFiles = await getVueFiles(srcDir);
    await fs.ensureDir(docsDir);

    for (const filePath of vueFiles) {
        await processVueFile(filePath);
    }

    console.log('Документация сгенерирована в папке docs');

    await generateHTMLIndex(docsDir, outputHTML);

    console.log(`HTML индекс сгенерирован: ${outputHTML}`);
}

generateDocs();
