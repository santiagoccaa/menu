export interface Product {
    id?: number;
    name: string;
    ingredients: string[];
    cost: number;
    category: string;
    image: string
}

export interface Category{
    name: string
}