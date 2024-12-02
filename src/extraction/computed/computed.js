import extractComment from '../comments/comments.js';

// Извлечение computed
export default function extractComputedProperties(scriptContent) {
    const computedInfo = [];
    const computedRegex = /const\s+(\w+)\s*=\s*computed/g;
    let match;

    while ((match = computedRegex.exec(scriptContent)) !== null) {
        const computedName = match[1];
        const comment = extractComment(scriptContent, match.index);

        computedInfo.push({
            name: computedName,
            comment: comment || null,
        });
    }

    return computedInfo;
}
