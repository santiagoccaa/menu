export interface Product {
    id?: number;
    name: string;
    ingredients: string[];
    cost: number;
    category: string;
    image: string | null
    stock?: boolean
    tipo_oferta?: string,
    oferta?: string
}

export interface Category {
    id?: number
    name: string
}

export interface Ofert {
    id: number,
    type: string,
    ofert: string | number
}

export interface ModalProps {
    id: number;
    name: string;
    image: string;
    cost: number;
    ofert: string;
    type_ofert: string
}