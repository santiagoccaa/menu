/**
 * Return text clean to params extranger
 */
export const cleanText = ({text}:{text:string}): string =>{
    return text.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.'']/g, '')
}
