import extractComment from '../comments/comments.js';

// Извлечение watch
export default function extractWatchers(scriptContent) {
    const watchersInfo = [];
    const watcherRegex = /watch\(([^,]+),/g; // Упрощённый поиск первого аргумента
    let match;

    while ((match = watcherRegex.exec(scriptContent)) !== null) {
        const firstArg = match[1].trim();
        const watchedVariables = extractWatchedVariables(firstArg);
        const comment = extractComment(scriptContent, match.index);

        if (watchedVariables.length > 0) {
            watchersInfo.push({
                watchedVariables,
                comment: comment || null,
            });
        }
    }
    return watchersInfo;
}

// Вспомогательная функция для извлечения переменных
function extractWatchedVariables(expression) {
    const trimmedExpr = expression.replace(/\s+/g, '');

    // Обработка массива переменных
    const arrayMatch = trimmedExpr.match(/^\[(.+)\]$/);
    if (arrayMatch) {
        return arrayMatch[1].split(',').map((v) => v.trim());
    }

    // Обработка стрелочной функции
    const arrowFunctionMatch = trimmedExpr.match(/^\(\)\s*=>\s*(.+)$/);
    if (arrowFunctionMatch) {
        const body = arrowFunctionMatch[1].trim();
        // Если это сложное выражение, возвращаем как есть
        return extractFromExpression(body);
    }

    // Простое значение
    return [trimmedExpr];
}

// Извлечение переменных из выражения
function extractFromExpression(content) {
    const matches = content.match(/\b\w+(?:\.\w+|\[\d+\])*\b/g);
    return matches || [];
}
