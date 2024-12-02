// Извлечение props
export default function extractProps(scriptContent) {
    const propsInfo = [];
    const propsRegex =
        /(\w+):\s*{\s*type:\s*(\w+(?:\s+as\s+PropType<[^>]+>)?),\s*(default:\s*([^,}]+|{[^}]+}|\[\])\s*,)?\s*(required:\s*(true|false))?/g;

    let match;
    while ((match = propsRegex.exec(scriptContent)) !== null) {
        const propName = match[1];
        const propType = match[2].trim();
        const defaultValue = match[4] ? match[4].trim() : 'undefined';
        const isRequired = match[6] === 'true';

        propsInfo.push({
            name: propName,
            type: propType,
            default: defaultValue,
            required: isRequired,
        });
    }

    return propsInfo;
}