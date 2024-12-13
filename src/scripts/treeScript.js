const originalTreeHTML = document.getElementById('tree-container').innerHTML;
let debounceTimeout;
function debounce(func, delay) {
    return function (...args) {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function openFileInIframe(filePath) {
    const iframe = document.getElementById('contentFrame');
    iframe.src = filePath;
    const allFileLinks = document.querySelectorAll('#tree-container li a');
    allFileLinks.forEach(link => {
        link.classList.remove('selected');
    });

    const fileLink = Array.from(allFileLinks).find(link => {
        return link.getAttribute('href').replace(/^#/, '') === filePath;
    });


    if (fileLink) {
        fileLink.classList.add('selected');
    }
}

function searchTree(query) {
    const container = document.getElementById('tree-container');
    if (!query) {
        container.innerHTML = originalTreeHTML;
        return;
    }

    const items = Array.from(container.querySelectorAll('li'));
    const foldersToShow = new Set();

    items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(query.toLowerCase());
        const isFolder = item.querySelector('.folder-toggle');

        if (matches) {
            item.style.display = 'block';

            if (isFolder) {
                foldersToShow.add(item);
            } else {
                let parent = item.parentElement;
                while (parent && parent.tagName === 'UL') {
                    parent.style.display = 'block';
                    parent = parent.previousElementSibling?.parentElement;
                }
            }
        } else {
            item.style.display = 'none';
        }

    });

    foldersToShow.forEach((folder) => {
        const folderContent = folder.querySelector('.folder-content');
        if (folderContent) {
            folderContent.style.display = 'block';
            const folderToggle = folder.querySelector('.folder-toggle');
            if (folderToggle) {
                folderToggle.textContent = folderToggle.textContent.replace('►', '▼');
            }
        }
    });
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce((e) => searchTree(e.target.value), 400));

function toggleFolder(element) {
    const folderContent = element.nextElementSibling;
    const isVisible = folderContent.style.display === 'block';
    folderContent.style.display = isVisible ? 'none' : 'block';

    if (isVisible) {
        element.textContent = element.textContent.replace('▼', '►');
    } else {
        element.textContent = element.textContent.replace('►', '▼');
    }
}

const expandButton = document.querySelector('.expand-button');
const collapseButton = document.querySelector('.collapse-button');

expandButton.addEventListener('click', expandAll);
collapseButton.addEventListener('click', collapseAll);

function expandAll() {
    const folderContents = document.querySelectorAll('.folder-content');
    const folderToggles = document.querySelectorAll('.folder-toggle');

    folderContents.forEach(content => {
        content.style.display = 'block';
    });

    folderToggles.forEach(toggle => {
        toggle.textContent = toggle.textContent.replace('►', '▼');
    });
}

function collapseAll() {
    const folderContents = document.querySelectorAll('.folder-content');
    const folderToggles = document.querySelectorAll('.folder-toggle');

    folderContents.forEach(content => {
        content.style.display = 'none';
    });

    folderToggles.forEach(toggle => {
        toggle.textContent = toggle.textContent.replace('▼', '►');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    openFileInIframe('App.html');
});

const treeContainer = document.getElementById('tree-container');
const resizer = document.getElementById('resizer');
let isResizing = false;

resizer.addEventListener('mousedown', (event) => {
    isResizing = true;
    document.body.style.cursor = 'ew-resize';
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
});

function resize(event) {
    if (!isResizing) return;
    const newWidth = event.clientX - treeContainer.getBoundingClientRect().left;
    if (newWidth > 100 && newWidth < window.innerWidth - 100) {
        treeContainer.style.width = `${newWidth}px`;
    }
}

function stopResize() {
    isResizing = false;
    document.body.style.cursor = '';
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
}