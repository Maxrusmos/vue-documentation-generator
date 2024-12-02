// Генерация секции Computed
export default function generateComputedSection(computedInfo) {
    if (!computedInfo.length) {
        return ``;
    }
    let computedContent = `
        <div class="computed-block">
            <div class="block-header">
                <h2 style="color: #d2587e;">Computed Properties</h2>
                <div class="icon-block">
                    C
                </div>
            </div>`;
    computedContent += `<div style="display: flex; gap: 8px; flex-direction: column; padding-left: 12px;">`;
    computedInfo.forEach((computed) => {
        computedContent +=
            `<div>
                <span style="color:#d2587e"><strong>${computed.name}</strong></span>
                <span class="comment">${computed.comment || ''}</span>
            </div>`;
    });
    computedContent += `</div></div>`;
    return computedContent;
}