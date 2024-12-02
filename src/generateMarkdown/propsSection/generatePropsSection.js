// Генерация секции Props
export default function generatePropsSection(propsInfo) {
    if (!propsInfo.length) {
        return ``;
    }
    let propsContent = `
        <div class="props-block">
        <div class="block-header">
            <h2 style="color: #886ed4;">Props</h2>
            <div class="icon-block">
                P
            </div>
        </div>`;
    propsContent += `<table>
        <thead>
            <tr>
                <th style="color:#886ed4">Prop Name</th>
                <th style="color:#4ec9b0">Type</th>
                <th style="color:#886ed4">Default</th>
                <th style="color:#4ec9b0">Required</th>
            </tr>
        </thead>
        <tbody>`;

    propsInfo.forEach((prop) => {
        const typeContent = prop.type.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        propsContent += `
            <tr>
                <td style="color:#886ed4">${prop.name}</td>
                <td style="color:#4ec9b0">${typeContent}</td>
                <td style="color:#886ed4">${prop.default}</td>
                <td style="color:#4ec9b0">${prop.required}</td>
            </tr>`;
    });

    propsContent += `</tbody></table></div>`;
    return propsContent;
}