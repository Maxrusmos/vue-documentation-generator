//извлечение комментария
export default function extractComment(scriptContent, entityStartIndex) {
    const commentRegex = /\/\*\*([\s\S]*?)\*\//g;
    let match;
    let lastComment = null;

    while ((match = commentRegex.exec(scriptContent)) !== null) {
        const commentEndIndex = match.index + match[0].length;
        if (commentEndIndex === scriptContent.lastIndexOf("\n", entityStartIndex)) {
            lastComment = match[1].trim();
        }
    }

    return lastComment;
}
