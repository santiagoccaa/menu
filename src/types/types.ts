export interface ProductsType {
    id: string,                  // Identificador único del producto
    name_product: string,        // Nombre del producto (ej: "Pizza Margarita")
    image_product: string,       // URL o path de la imagen del producto
    price_product: number,       // Precio base del producto
    ingredients: string[],       // Lista de ingredientes
    descripcion: string,         // Descripción detallada del producto
    stock: boolean,              // Si está disponible en el menú o no
    currency: string,            // Moneda en la que está el precio (ej: "USD", "COP")
    hasOfert: boolean,           // Indica si el producto tiene oferta activa
    type_ofert: string | number, // Tipo de oferta (ej: "%", "2x1", etc.)
    oferta_product: string,      // Detalle de la oferta (ej: "20%", "Mitad de precio")
    category_product: string,    // Categoría (ej: "Bebidas", "Entradas", "Postres")
    preparation_time: number,   // Tiempo de preparación en minutos (opcional)
    is_special: boolean,        // Si es un plato destacado / especial del chef (opcional)
    serving_size: string,       // Tamaño de la porción (ej: "1 persona", "2 personas") (opcional)
    date_create: Date,           // Fecha de creación en la BD
    date_update: Date            // Última fecha de actualización
}

export interface CategorysType {
    id: string
    name: string
    date_create?: Date,
    date_update?: Date
}
