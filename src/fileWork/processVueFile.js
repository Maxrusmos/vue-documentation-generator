import fs from "fs-extra";
import path from 'path';
import extractMethods from "../extraction/methods/methods.js";
import extractComputedProperties from "../extraction/computed/computed.js";
import extractProps from "../extraction/props/props.js";
import extractWatchers from "../extraction/watchers/watchers.js";
import generateMarkdown from "../generateMarkdown/generateMarkdown.js";

const srcDir = './src';
const docsDir = './docs';

// Обработка Vue файла
export default async function processVueFile(filePath) {
    const relativePath = path.relative(srcDir, filePath);
    const fileName = path.basename(filePath, '.vue');
    const fileContent = await fs.readFile(filePath, 'utf-8');

    const scriptContentMatch = fileContent.match(
        /<script\s+lang="ts"\s+setup>([\s\S]*?)<\/script>/
    );
    if (!scriptContentMatch) {
        return;
    }

    const scriptContent = scriptContentMatch[1];
    const methodsInfo = extractMethods(scriptContent);
    const computedInfo = extractComputedProperties(scriptContent);
    const propsInfo = extractProps(scriptContent);
    const watchersInfo = extractWatchers(scriptContent);
    const componentDocsDir = path.join(docsDir, path.dirname(relativePath));
    const cssRelativePath = path.relative(componentDocsDir, path.join(docsDir, 'documentation.css'));

    const mdContent = generateMarkdown(
        fileName,
        methodsInfo,
        computedInfo,
        propsInfo,
        watchersInfo,
        cssRelativePath
    );

    await fs.ensureDir(componentDocsDir);

    const docFilePath = path.join(componentDocsDir, `${fileName}.html`);
    await fs.writeFile(docFilePath, mdContent);
}