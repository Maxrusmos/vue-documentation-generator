// Извлечение методов
export default function extractMethods(scriptContent) {
    const methodsInfo = [];
    const methodRegex = /const\s+(\w+)\s*=\s*\(([\w\s:,]*)\)\s*=>\s*(?::\s*([\w\s]+))?\s*{/g;
    let match;
    while ((match = methodRegex.exec(scriptContent)) !== null) {
        const methodName = match[1];
        const params = match[2]
            .split(',')
            .map((param) => {
                const [paramName, paramType] = param.split(':').map((p) => p.trim());
                return { name: paramName, type: paramType || 'any' };
            })
            .filter((param) => param.name);

        const returnType = match[3] ? match[3].trim() : '';
        methodsInfo.push({ name: methodName, params, returnType });
    }

    return methodsInfo;
}