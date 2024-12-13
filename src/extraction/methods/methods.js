import extractComment from '../comments/comments.js';

// Функция для экранирования HTML
function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Функция для извлечения параметров как строки
function processParameters(paramString) {
    return escapeHtml(paramString.trim());
}

// Функция для разбора параметров
function parseParameters(paramString) {
    const params = [];
    let depth = 0;
    let buffer = '';
    let paramName = '';

    for (let i = 0; i < paramString.length; i++) {
        const char = paramString[i];

        if (char === '(' || char === '<') {
            depth++;
        } else if (char === ')' || char === '>') {
            depth--;
        }

        if (depth === 0 && char === ':') {
            paramName = buffer.trim();
            buffer = '';
        } else if (depth === 0 && (char === ',' || i === paramString.length - 1)) {
            if (i === paramString.length - 1 && char !== ',') {
                buffer += char;
            }
            const paramType = buffer.trim();
            params.push({ name: paramName, type: escapeHtml(paramType) });
            buffer = '';
        } else {
            buffer += char;
        }
    }

    return params;
}

// Функция для извлечения методов
export default function extractMethods(scriptContent) {
    const methodsInfo = [];
    const methodRegex = /const\s+(\w+)\s*=\s*(async\s+)?\(([^)]*)\)\s*=>/g;
    let match;

    while ((match = methodRegex.exec(scriptContent)) !== null) {
        const methodName = match[1];
        const isAsync = !!match[2];
        const paramString = match[3];
        const params = parseParameters(paramString);
        const comment = extractComment(scriptContent, match.index);

        methodsInfo.push({
            name: isAsync ? `async ${methodName}` : methodName,
            params,
            comment: comment || null,
        });
    }

    return methodsInfo;
}
