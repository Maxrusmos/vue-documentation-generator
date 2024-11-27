export default function generateMarkdown(fileName, methodsInfo, computedInfo, propsInfo, watchersInfo) {
    let mdContent = ``;
    mdContent += generatePropsSection(propsInfo);
    mdContent += generateMethodsSection(methodsInfo);
    mdContent += generateComputedSection(computedInfo);
    mdContent += generateWatchersSection(watchersInfo);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName} Documentation</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #333; }
        h2 { color: #555; }
        pre { background: #f5f5f5; padding: 10px; }
        code { font-family: monospace; }
        ul { list-style-type: none; padding-left: 20px; }
    </style>
</head>
<body>
    <h1>${fileName} Documentation</h1>
    <div>
        ${mdContent}
    </div>
</body>
</html>`;
    return htmlContent;
}

// Генерация секции Props
function generatePropsSection(propsInfo) {
    let propsContent = `<h2>Props</h2>`;
    propsContent += `<table>
        <thead>
            <tr>
                <th style="color:#4988c4">Prop Name</th>
                <th style="color:#ad795f">Type</th>
                <th style="color:#bb76af">Default</th>
                <th style="color:#67a27b">Required</th>
            </tr>
        </thead>
        <tbody>`;

    propsInfo.forEach((prop) => {
        const typeContent = prop.type.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        propsContent += `
            <tr>
                <td><strong style="color:#4988c4">${prop.name}</strong></td>
                <td style="color:#ad795f">${typeContent}</td>
                <td style="color:#bb76af">${prop.default}</td>
                <td style="color:#67a27b">${prop.required}</td>
            </tr>`;
    });

    propsContent += `</tbody></table>\n`;
    return propsContent;
}

// Генерация секции Methods
function generateMethodsSection(methodsInfo) {
    let methodsContent = `<div class="methods-block" style="border: 1px solid red;"><h2>Methods</h2>`;
    methodsContent += `<div style="display: flex; gap: 8px; flex-direction: column; padding-left: 8px;">`;
    methodsInfo.forEach((method) => {
        methodsContent += `<div>`;
        const paramsString = method.params
            .map(
                (param) =>
                    `<span style="color:#bbbdc3">${param.name}</span>: <span style="color:#ad795f">${param.type}</span>`
            )
            .join(', ');

        methodsContent += `<span style="color:#4988c4"><strong>${method.name}</strong></span>(${paramsString}) <span style="color:#ad795f">${method.returnType}</span><br>`;
        methodsContent += `</div>`;
    });
    methodsContent += `</div></div>`;
    return methodsContent;
}

// Генерация секции Computed
function generateComputedSection(computedInfo) {
    let computedContent = `<h2>Computed Properties</h2>`;
    computedInfo.forEach((computed) => {
        computedContent += `<span style="color:#4988c4"><strong>${computed.name}</strong></span><br>`;
    });
    return computedContent;
}

// Генерация секции Watchers
function generateWatchersSection(watchersInfo) {
    let watchersContent = `<h2>Watchers</h2>`;
    if (watchersInfo.length > 0) {
        watchersInfo.forEach((watchedVariables) => {
            watchersContent += `<span style="color:#67a27b">Watched variables:</span> <span style="color:#bbbdc3">${watchedVariables.join(', ')}</span></br>`;
        });
    } else {
        watchersContent += '<span style="color:#bbbdc3">No watchers found.</span>';
    }
    return watchersContent;
}
