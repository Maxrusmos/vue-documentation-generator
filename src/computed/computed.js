// Извлечение computed
export default function extractComputedProperties(scriptContent) {
    const computedInfo = [];
    const computedRegex = /const\s+(\w+)\s*=\s*computed\s*\(\s*\(\s*\)\s*=>\s*([\s\S]+?)\)/g;

    let match;
    while ((match = computedRegex.exec(scriptContent)) !== null) {
        const computedName = match[1];
        computedInfo.push({ name: computedName });
    }

    return computedInfo;
}