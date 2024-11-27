//Извлечение watch
export default function extractWatchers(scriptContent) {
    const watchersInfo = [];
    const watcherRegex = /watch\(([^()]*?(\([^()]*\)[^()]*?)*)\)/g;
    let match;
    while ((match = watcherRegex.exec(scriptContent)) !== null) {
        const fullWatcherCode = match[1].trim();
        const firstArg = extractFirstArgument(fullWatcherCode);
        const watchedVariables = extractWatchedVariables(firstArg);
        if (watchedVariables.length > 0) {
            watchersInfo.push(watchedVariables);
        }
    }
    return watchersInfo;
}

// Вспомогательная функция для извлечения первого аргумента в watch
function extractFirstArgument(watchCode) {
    const commaIndex = watchCode.indexOf(',');
    if (commaIndex !== -1) {
        return watchCode.slice(0, commaIndex).trim();
    }
    return watchCode;
}

// Вспомогательная функция для извлечения переменных, за которыми следим
function extractWatchedVariables(expression) {
    const trimmedExpr = expression.replace(/\s+/g, '');
    const arrayMatch = trimmedExpr.match(/^\(\)\s*=>\s*\[(.+)\]$/);
    if (arrayMatch) {
        const arrayContent = arrayMatch[1];
        return arrayContent.match(/\b\w+(?:\.\w+|\[\d+\])*\b/g) || [];
    }
    const expressionMatch = trimmedExpr.match(/^\(\)\s*=>\s*([\w.[\]]+)$/);
    if (expressionMatch) {
        return [expressionMatch[1]];
    }
    const simpleMatch = trimmedExpr.match(/^\b\w+\b$/);
    if (simpleMatch) {
        return [simpleMatch[0]];
    }
    return [];
}
