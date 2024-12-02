import generateComputedSection from './computedSection/generateComputedSection.js';
import generateMethodsSection from './methodsSection/generateMethodsSection.js';
import generatePropsSection from './propsSection/generatePropsSection.js';
import generateWatchersSection from './watchersSection/generateWatchersSection.js';

export default function generateMarkdown(fileName, methodsInfo, computedInfo, propsInfo, watchersInfo, cssPath) {
    const sections = [
        generatePropsSection(propsInfo),
        generateMethodsSection(methodsInfo),
        generateComputedSection(computedInfo),
        generateWatchersSection(watchersInfo),
    ];
    const htmlInnerContent = sections.join('');

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${fileName} Documentation</title>
                <link rel="stylesheet" href="${cssPath}">
            </head>
            <body>
                <h1>${fileName}.vue</h1>
                <div class="container-for-inner-html">
                    ${htmlInnerContent}
                </div>
            </body>
        </html>`;
    return htmlContent;
}
