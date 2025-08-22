/**
 * Return text clean to params extranger
 */
export const cleanText = ({ text }: { text: string }): string => {
    return text.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.'']/g, '')
}

export const preGenerateId = (): string => {
    const uniqueId = (Date.now().toString(16) + Math.random().toString(16).slice(2, 8))
        .toLowerCase();
    return `id_${uniqueId}`;
};