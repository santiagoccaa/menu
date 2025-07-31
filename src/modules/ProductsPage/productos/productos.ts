export interface Producto {
    id: number;
    name: string;
    ingredients: string[];
    cost: number;
    category: string
    image: string
}

export const productos: Producto[] = [
    {
        id: 1,
        name: "Coca-Cola",
        ingredients: ["Agua carbonatada", "Jarabe de maíz", "Caramelo", "Ácido fosfórico", "Saborizantes naturales"],
        cost: 2.50,
        category: "bebidas",
        image: "cafe_01.jpg"
    },
    {
        id: 2,
        name: "Jugo de Naranja Fresh",
        ingredients: ["Naranja fresca", "Agua", "Azúcar natural", "Pulpa de naranja"],
        cost: 3.25,
        category: "bebidas",
        image: "cafe_02.jpg"
    },
    {
        id: 3,
        name: "Smoothie de Fresa",
        ingredients: ["Fresas frescas", "Yogurt natural", "Leche", "Miel", "Hielo"],
        cost: 4.75,
        category: "bebidas",
        image: "cafe_03.jpg"
    },
    {
        id: 4,
        name: "Café Americano",
        ingredients: ["Granos de café arábica", "Agua caliente"],
        cost: 2.99,
        category: "bebidas",
        image: "cafe_04.jpg"
    },
    {
        id: 5,
        name: "Cappuccino",
        ingredients: ["Espresso", "Leche vaporizada", "Espuma de leche", "Canela"],
        cost: 4.50,
        category: "bebidas",
        image: "cafe_05.jpg"
    },
    {
        id: 6,
        name: "Té Verde",
        ingredients: ["Hojas de té verde", "Agua caliente", "Miel opcional"],
        cost: 2.75,
        category: "bebidas",
        image: "cafe_06.jpg"
    },
    {
        id: 7,
        name: "Limonada Natural",
        ingredients: ["Limones frescos", "Agua", "Azúcar", "Hielo", "Menta"],
        cost: 3.00,
        category: "bebidas",
        image: "cafe_07.jpg"
    },
    {
        id: 8,
        name: "Milkshake de Vainilla",
        ingredients: ["Helado de vainilla", "Leche", "Extracto de vainilla", "Crema batida"],
        cost: 5.25,
        category: "bebidas",
        image: "cafe_08.jpg"
    },
    {
        id: 9,
        name: "Agua Mineral",
        ingredients: ["Agua mineral natural", "Sales minerales"],
        cost: 1.99,
        category: "bebidas",
        image: "cafe_09.jpg"
    },
    {
        id: 10,
        name: "Mojito Sin Alcohol",
        ingredients: ["Menta fresca", "Limón", "Azúcar", "Agua con gas", "Hielo"],
        cost: 4.25,
        category: "bebidas",
        image: "cafe_10.jpg"
    },
    {
        id: 11,
        name: "Chocolate Caliente",
        ingredients: ["Cacao en polvo", "Leche", "Azúcar", "Crema batida", "Marshmallows"],
        cost: 3.75,
        category: "bebidas",
        image: "cafe_11.jpg"
    },
    {
        id: 12,
        name: "Frappé de Caramelo",
        ingredients: ["Café espresso", "Leche", "Sirope de caramelo", "Hielo", "Crema batida"],
        cost: 5.50,
        category: "bebidas",
        image: "cafe_12.jpg"
    },
    {
        id: 13,
        name: "Agua de Coco",
        ingredients: ["Agua de coco natural", "Pulpa de coco"],
        cost: 3.50,
        category: "bebidas",
        image: "cafe_13.jpg"
    },
    {
        id: 14,
        name: "Energizante Natural",
        ingredients: ["Guaraná", "Ginseng", "Vitaminas B", "Agua carbonatada", "Saborizantes naturales"],
        cost: 4.99,
        category: "bebidas",
        image: "cafe_14.jpg"
    },
    {
        id: 15,
        name: "Dona Glaseada Clásica",
        ingredients: ["Harina de trigo", "Azúcar", "Huevos", "Mantequilla", "Levadura", "Glaseado de azúcar"],
        cost: 1.99,
        category: "donals",
        image: "donas_01.jpg"
    },
    {
        id: 16,
        name: "Dona de Chocolate",
        ingredients: ["Harina de trigo", "Cacao en polvo", "Azúcar", "Huevos", "Mantequilla", "Cobertura de chocolate"],
        cost: 2.25,
        category: "donals",
        image: "donas_02.jpg"
    },
    {
        id: 17,
        name: "Dona de Fresa",
        ingredients: ["Harina de trigo", "Azúcar", "Huevos", "Mantequilla", "Mermelada de fresa", "Glaseado rosa"],
        cost: 2.50,
        category: "donals",
        image: "donas_03.jpg"
    },
    {
        id: 18,
        name: "Dona Boston Cream",
        ingredients: ["Masa de dona", "Crema pastelera", "Cobertura de chocolate", "Vainilla"],
        cost: 3.25,
        category: "donals",
        image: "donas_04.jpg"
    },
    {
        id: 19,
        name: "Dona de Arce",
        ingredients: ["Harina de trigo", "Azúcar morena", "Huevos", "Mantequilla", "Sirope de arce", "Glaseado de arce"],
        cost: 2.75,
        category: "donals",
        image: "donas_05.jpg"
    },
    {
        id: 20,
        name: "Dona de Coco",
        ingredients: ["Harina de trigo", "Coco rallado", "Leche de coco", "Azúcar", "Huevos", "Glaseado blanco"],
        cost: 2.99,
        category: "donals",
        image: "donas_06.jpg"
    },
    {
        id: 21,
        name: "Dona Rellena de Dulce de Leche",
        ingredients: ["Masa de dona", "Dulce de leche", "Azúcar glas", "Canela"],
        cost: 3.50,
        category: "donals",
        image: "donas_07.jpg"
    },
    {
        id: 22,
        name: "Dona de Limón",
        ingredients: ["Harina de trigo", "Ralladura de limón", "Jugo de limón", "Azúcar", "Huevos", "Glaseado de limón"],
        cost: 2.75,
        category: "donals",
        image: "donas_08.jpg"
    },
    {
        id: 23,
        name: "Dona de Canela y Azúcar",
        ingredients: ["Harina de trigo", "Canela molida", "Azúcar", "Mantequilla", "Huevos", "Cobertura de canela"],
        cost: 2.25,
        category: "donals",
        image: "donas_09.jpg"
    },
    {
        id: 24,
        name: "Dona Red Velvet",
        ingredients: ["Harina de trigo", "Cacao", "Colorante rojo", "Suero de leche", "Queso crema", "Glaseado"],
        cost: 3.75,
        category: "donals"
        ,
        image: "donas_10.jpg"
    },
    {
        id: 25,
        name: "Dona de Vainilla Francesa",
        ingredients: ["Harina de trigo", "Extracto de vainilla", "Crema", "Azúcar", "Huevos", "Glaseado de vainilla"],
        cost: 2.99,
        category: "donals",
        image: "donas_11.jpg"
    },
    {
        id: 26,
        name: "Dona de Café",
        ingredients: ["Harina de trigo", "Café espresso", "Azúcar morena", "Mantequilla", "Glaseado de café"],
        cost: 3.25,
        category: "donals",
        image: "donas_12.jpg"
    },
    {
        id: 27,
        name: "Dona de Nutella",
        ingredients: ["Masa de dona", "Nutella", "Avellanas trituradas", "Chocolate derretido"],
        cost: 3.99,
        category: "donals",
        image: "donas_13.jpg"
    },
    {
        id: 28,
        name: "Dona Arcoíris",
        ingredients: ["Harina de trigo", "Colorantes alimentarios", "Azúcar", "Huevos", "Sprinkles multicolor", "Glaseado blanco"],
        cost: 3.50,
        category: "donals",
        image: "donas_14.jpg"
    },
    {
        id: 29,
        name: "Galletas con Chispas de Chocolate",
        ingredients: ["Harina de trigo", "Mantequilla", "Azúcar morena", "Huevos", "Chispas de chocolate", "Vainilla", "Bicarbonato"],
        cost: 3.99,
        category: "galletas",
        image: "galletas_01.jpg"
    },
    {
        id: 30,
        name: "Galletas de Avena",
        ingredients: ["Avena", "Harina integral", "Mantequilla", "Azúcar morena", "Canela", "Pasas", "Huevos"],
        cost: 4.25,
        category: "galletas",
        image: "galletas_02.jpg"
    },
    {
        id: 31,
        name: "Galletas de Mantequilla",
        ingredients: ["Harina de trigo", "Mantequilla", "Azúcar", "Yemas de huevo", "Sal", "Extracto de vainilla"],
        cost: 3.75,
        category: "galletas",
        image: "galletas_03.jpg"
    },
    {
        id: 32,
        name: "Galletas Snickerdoodle",
        ingredients: ["Harina de trigo", "Mantequilla", "Azúcar", "Huevos", "Canela molida", "Cremor tártaro", "Bicarbonato"],
        cost: 4.50,
        category: "galletas",
        image: "galletas_04.jpg"
    },
    {
        id: 33,
        name: "Galletas de Jengibre",
        ingredients: ["Harina de trigo", "Jengibre molido", "Canela", "Melaza", "Mantequilla", "Azúcar morena", "Huevos"],
        cost: 4.75,
        category: "galletas",
        image: "galletas_04.jpg"
    },
    {
        id: 34,
        name: "Galletas Oreo Caseras",
        ingredients: ["Harina de trigo", "Cacao en polvo", "Azúcar", "Mantequilla", "Crema de queso", "Azúcar glas", "Vainilla"],
        cost: 5.25,
        category: "galletas",
        image: "galletas_06.jpg"
    },
    {
        id: 35,
        name: "Hamburguesa Clásica",
        ingredients: ["Carne de res", "Lechuga", "Tomate", "Cebolla", "Pan de hamburguesa", "Salsa especial"],
        cost: 8.99,
        category: "hamburguesas",
        image: "hamburguesas_01.jpg"
    },
    {
        id: 36,
        name: "Hamburguesa BBQ",
        ingredients: ["Carne de res", "Queso cheddar", "Cebolla caramelizada", "Salsa BBQ", "Pan brioche", "Tocino"],
        cost: 10.50,
        category: "hamburguesas",
        image: "hamburguesas_02.jpg"
    },
    {
        id: 37,
        name: "Hamburguesa Vegetariana",
        ingredients: ["Patty de lentejas", "Aguacate", "Lechuga", "Tomate", "Queso vegano", "Pan integral"],
        cost: 9.25,
        category: "hamburguesas",
        image: "hamburguesas_03.jpg"
    },
    {
        id: 38,
        name: "Hamburguesa Doble Queso",
        ingredients: ["Doble carne de res", "Queso americano", "Queso suizo", "Pepinillos", "Mostaza", "Pan de sésamo"],
        cost: 12.75,
        category: "hamburguesas",
        image: "hamburguesas_04.jpg"
    },
    {
        id: 39,
        name: "Hamburguesa Mexicana",
        ingredients: ["Carne de res", "Guacamole", "Jalapeños", "Queso monterey", "Pico de gallo", "Pan de maíz"],
        cost: 11.20,
        category: "hamburguesas",
        image: "hamburguesas_05.jpg"
    },
    {
        id: 40,
        name: "Hamburguesa Gourmet",
        ingredients: ["Carne wagyu", "Queso brie", "Rúcula", "Tomate cherry", "Cebolla morada", "Pan artesanal"],
        cost: 15.99,
        category: "hamburguesas",
        image: "hamburguesas_06.jpg"
    },
    {
        id: 41,
        name: "Hot Dog Clásico",
        ingredients: ["Salchicha de res", "Pan de hot dog", "Mostaza", "Ketchup", "Cebolla picada", "Pepinillos"],
        cost: 6.99,
        category: "hot-dogs",
        image: "hot-dog_01.jpg"
    },
    {
        id: 42,
        name: "Hot Dog Gourmet",
        ingredients: ["Salchicha artesanal de cerdo", "Pan brioche", "Cebolla caramelizada", "Queso gruyere", "Mostaza dijon", "Rúcula", "Tomates cherry"],
        cost: 12.50,
        category: "hot-dogs",
        image: "hot-dog_02.jpg"
    },
    {
        id: 43,
        name: "Pastel de Chocolate",
        ingredients: ["Harina de trigo", "Cacao en polvo", "Azúcar", "Huevos", "Mantequilla", "Crema de chocolate", "Cobertura de chocolate"],
        cost: 18.99,
        category: "pasteles",
        image: "pastel_01.jpg"
    },
    {
        id: 44,
        name: "Pastel de Vainilla",
        ingredients: ["Harina de trigo", "Extracto de vainilla", "Azúcar", "Huevos", "Mantequilla", "Crema pastelera", "Fondant blanco"],
        cost: 16.50,
        category: "pasteles",
        image: "pastel_02.jpg"
    },
    {
        id: 45,
        name: "Pastel Red Velvet",
        ingredients: ["Harina de trigo", "Cacao", "Colorante rojo", "Suero de leche", "Queso crema", "Azúcar glas", "Decoración de rosas"],
        cost: 22.75,
        category: "pasteles",
        image: "pastel_03.jpg"
    },
    {
        id: 46,
        name: "Pastel de Zanahoria",
        ingredients: ["Harina integral", "Zanahoria rallada", "Canela", "Nueces", "Aceite vegetal", "Queso crema", "Azúcar"],
        cost: 19.99,
        category: "pasteles",
        image: "pastel_04.jpg"
    },
    {
        id: 47,
        name: "Pastel de Tres Leches",
        ingredients: ["Bizcocho esponjoso", "Leche condensada", "Leche evaporada", "Crema de leche", "Canela", "Merengue"],
        cost: 21.50,
        category: "pasteles",
        image: "pastel_05.jpg"
    },
    {
        id: 48,
        name: "Pastel de Fresa",
        ingredients: ["Bizcocho de vainilla", "Fresas frescas", "Crema chantilly", "Mermelada de fresa", "Hojas de menta"],
        cost: 20.25,
        category: "pasteles",
        image: "pastel_06.jpg"
    },
    {
        id: 49,
        name: "Pizza Margherita",
        ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella fresca", "Albahaca", "Aceite de oliva"],
        cost: 12.99,
        category: "pizzas",
        image: "pizzas_01.jpg"
    },
    {
        id: 50,
        name: "Pizza Pepperoni",
        ingredients: ["Masa tradicional", "Salsa de tomate", "Mozzarella", "Pepperoni", "Orégano"],
        cost: 14.50,
        category: "pizzas",
        image: "pizzas_02.jpg"
    },
    {
        id: 51,
        name: "Pizza Hawaiana",
        ingredients: ["Masa dulce", "Salsa de tomate", "Mozzarella", "Jamón", "Piña", "Cebolla"],
        cost: 15.25,
        category: "pizzas",
        image: "pizzas_03.jpg"
    },
    {
        id: 52,
        name: "Pizza Cuatro Quesos",
        ingredients: ["Masa fina", "Salsa blanca", "Mozzarella", "Gorgonzola", "Parmesano", "Ricotta"],
        cost: 16.99,
        category: "pizzas",
        image: "pizzas_04.jpg"
    },
    {
        id: 53,
        name: "Pizza Vegetariana",
        ingredients: ["Masa integral", "Salsa de tomate", "Mozzarella", "Pimientos", "Champiñones", "Aceitunas", "Cebolla"],
        cost: 15.75,
        category: "pizzas",
        image: "pizzas_05.jpg"
    },
    {
        id: 54,
        name: "Pizza Carnívora",
        ingredients: ["Masa gruesa", "Salsa BBQ", "Mozzarella", "Pepperoni", "Salchicha", "Tocino", "Jamón"],
        cost: 18.50,
        category: "pizzas",
        image: "pizzas_06.jpg"
    },
    {
        id: 55,
        name: "Pizza Mediterránea",
        ingredients: ["Masa fina", "Pesto", "Mozzarella", "Tomates cherry", "Aceitunas kalamata", "Queso feta", "Rúcula"],
        cost: 17.25,
        category: "pizzas",
        image: "pizzas_07.jpg"
    },
    {
        id: 56,
        name: "Pizza Mexicana",
        ingredients: ["Masa de maíz", "Salsa picante", "Mozzarella", "Jalapeños", "Frijoles", "Carne molida", "Aguacate"],
        cost: 16.75,
        category: "pizzas",
        image: "pizzas_08.jpg"
    },
    {
        id: 57,
        name: "Pizza Suprema",
        ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella", "Pepperoni", "Salchicha", "Pimientos", "Cebolla", "Champiñones"],
        cost: 19.99,
        category: "pizzas",
        image: "pizzas_09.jpg"
    },
    {
        id: 58,
        name: "Pizza Blanca",
        ingredients: ["Masa fina", "Salsa de ajo", "Ricotta", "Mozzarella", "Espinacas", "Tomates secos"],
        cost: 15.50,
        category: "pizzas",
        image: "pizzas_10.jpg"
    },
    {
        id: 59,
        name: "Pizza Prosciutto",
        ingredients: ["Masa artesanal", "Salsa de tomate", "Mozzarella di bufala", "Prosciutto di Parma", "Rúcula", "Parmesano"],
        cost: 21.99,
        category: "pizzas",
        image: "pizzas_11.jpg"
    }
];