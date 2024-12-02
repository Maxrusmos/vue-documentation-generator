import extractComment from '../comments/comments.js';

// Извлечение методов
export default function extractMethods(scriptContent) {
    const methodsInfo = [];

    // Регулярное выражение для извлечения методов
    const methodRegex = /const\s+(\w+)\s*=\s*\(([\w\s{},:|[\]<>]*)\)\s*=>\s*(?::\s*([\w\s|<>]+))?\s*{/g;
    let match;

    while ((match = methodRegex.exec(scriptContent)) !== null) {
        const methodName = match[1];
        const params = match[2]
            .split(',')
            .map((param) => {
                const paramParts = param.trim().split(':').map((p) => p.trim());

                let paramName = paramParts[0];
                let paramType = paramParts[1] || 'any';

                // Обработка типов массивов, например string[]
                if (paramType.includes('[]')) {
                    paramType = paramType.trim();
                }

                // Обработка типов с дженериками, например TableHeaderDragendEvent<AccidentTableColumns>
                if (paramType.includes('<') && paramType.includes('>')) {
                    const genericTypeMatch = paramType.match(/^([a-zA-Z0-9_]+)<([a-zA-Z0-9_,\s|<>]+)>$/);
                    if (genericTypeMatch) {
                        console.log(genericTypeMatch[1], genericTypeMatch[2]);
                        paramType = `${genericTypeMatch[1]}&lt;${genericTypeMatch[2].trim()}&gt;`;
                    }
                }

                // Обработка более сложных типов, например, string | number
                if (paramType.includes('|')) {
                    paramType = paramType.split('|').map(type => type.trim()).join(' | ');
                }

                // Обработка объектных типов в фигурных скобках, например { label: string }
                if (paramName.startsWith('{') && paramName.endsWith('}')) {
                    paramName = paramName.slice(1, -1).trim();
                }

                return { name: paramName, type: paramType };
            })
            .filter((param) => param.name);

        // Обработка возвращаемого типа
        const returnType = match[3] ? match[3].trim() : '';
        const comment = extractComment(scriptContent, match.index);

        methodsInfo.push({
            name: methodName,
            params,
            returnType,
            comment: comment || null,
        });
    }

    return methodsInfo;
}
