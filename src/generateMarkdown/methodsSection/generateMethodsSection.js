// Генерация секции Methods
export default function generateMethodsSection(methodsInfo) {
    if (!methodsInfo.length) {
        return ``;
    }
    let methodsContent = `    
        <div class="methods-block">
         <div class="block-header">
            <h2 style="color: #1565C0;">Methods</h2>
            <div class="icon-block">
                M
            </div>
        </div>`;
    methodsContent += `<div style="display: flex; gap: 8px; flex-direction: column; padding-left: 12px;">`;
    methodsInfo.forEach((method) => {
        methodsContent += `<div>`;
        const paramsString = method.params
            .map(
                (param) =>
                    `<span style="color: #42b883">${param.name}</span>: <span style="color:#4ec9b0">${param.type}</span>`
            )
            .join(', ');

        methodsContent +=
            `<span style="color:#1565C0">
                <strong>${method.name}</strong>
            </span>
            <span style="color: #42b883">(${paramsString})</span>
            <span style="color:#ad795f">${method.returnType}</span>
            <span class="comment">${method.comment || ''}</span>`;
        methodsContent += `</div>`;
    });
    methodsContent += `</div></div>`;
    return methodsContent;
}