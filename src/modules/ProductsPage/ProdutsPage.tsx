'use client'
import { useParams } from 'next/navigation'
import ProductoCard from './components/ProductoCard';

import { productos } from "./productos/productos"

export default function CategoryPage() {
    const slug = useParams().slug as string;

    const productList = productos.filter(p => p.category === slug)

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 uppercase">{slug}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productList.map(product => (
                    <ProductoCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
