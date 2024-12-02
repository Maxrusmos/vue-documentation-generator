// Генерация секции Watchers
export default function generateWatchersSection(watchersInfo) {
    if (!watchersInfo.length) {
        return ``;
    }
    let watchersContent = `
        <div class="watchers-block">
            <div class="block-header">
                <h2 style="color: #4CAF50;">Watchers</h2>
                <div class="icon-block">
                    W
                </div>
            </div>`;
    watchersContent += `<div style="display: flex; gap: 8px; flex-direction: column; padding-left: 12px;">`;
    if (watchersInfo.length > 0) {
        watchersInfo.forEach((watcher) => {
            watchersContent +=
                `<div style="display: flex; gap: 2px;">
                    <span style="color:#4CAF50"><strong>${watcher.watchedVariables.join(', ')}</strong></span>
                    <span class="comment">${watcher.comment || ''}</span>
                </div>`;
        });
    }
    watchersContent += `</div>`;
    return watchersContent;
}