function formatField(fieldArray: any[]): string {
    if (!Array.isArray(fieldArray)) return ""; 
    return fieldArray
        .map(item =>
            Object.entries(item).map(([key, value]) => {
                return Array.isArray(value)
                    ? `${key}: ${value.join(", ")}`
                    : `${key}: ${value}`;
            }).join(", ")
        )
        .join("\n");
}

function parseField(fieldString: string): any[] {
    if (typeof fieldString !== 'string' || !fieldString.trim()) return [];

    return fieldString
        .split("\n") 
        .map(line => {
            const entryObj: Record<string, any> = {};
            line.split(", ").forEach(part => {  
                const [key, value] = part.split(": ");
                if (key && value) {
                    entryObj[key.trim()] = value.includes(",") 
                        ? value.split(",").map(v => v.trim())  
                        : value.trim(); 
                }
            });
            return entryObj;
        });
}

export { formatField, parseField };
