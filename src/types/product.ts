export interface Product {
    id?: number;
    name: string;
    ingredients: string[];
    cost: number;
    category: string;
    image: string | null
}

export interface Category {
    id?: number
    name: string
}