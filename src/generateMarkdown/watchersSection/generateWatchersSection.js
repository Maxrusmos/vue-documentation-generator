// Генерация секции Watchers
export default function generateWatchersSection(watchersInfo) {
    if (!watchersInfo.length) {
        return ``;
    }
    let watchersContent = `
        <div class="watchers-block">
            <div class="block-header">
                <h2 style="color: #5ED375;">Watchers</h2>
                <div class="icon-block">
                    W
                </div>
            </div>`;
    if (watchersInfo.length > 0) {
        watchersInfo.forEach((watcher) => {
            watchersContent +=
                `<div class="content-row">
                    <div class="watcher-signature">
                        <span>${watcher.watchedVariables.join(', ')}</span>
                    </div>`;

                if (watcher.comment) {
                    watchersContent += `
                    <div class="hr-line"></div>
                    <button class="expand-comment" onclick="toggleComment(this)">
                        <span class="arrow">►</span>
                    </button>`;
                }

                watchersContent += `</div>
                    <div class="comment">${watcher.comment || ''}</div>`;
        });
    }
    watchersContent += `</div> 
        <script>
        function toggleComment(button) {
            const methodRow = button.closest('.content-row');
            const comment = methodRow.nextElementSibling;
            const arrow = button.querySelector('.arrow');
        
            if (comment.classList.contains('show')) {
                hideComment(comment, arrow);
            } else {
                showComment(comment, arrow);
            }
        }
        
        function showComment(comment, arrow) {
            comment.style.display = 'block';
            setTimeout(() => {
                comment.classList.add('show'); 
                arrow.classList.add('rotate'); 
            }, 10);
        }
        
        function hideComment(comment, arrow) {
            comment.classList.remove('show'); 
            arrow.classList.remove('rotate');
            setTimeout(() => {
                comment.style.display = 'none'; 
            }, 200); 
        }
        </script>`;
    return watchersContent;
}