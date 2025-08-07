"use client"

import { fetchProducts } from '@/lib/service'
import { Product } from '@/types/product'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddProducts from './components/AddProducts'

const ProductList = () => {
    const [productList, setProductList] = useState<Product[]>([])

    const getProducts = async () => {
        const data = await fetchProducts()
        if (data) setProductList(data)
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div>
            <AddProducts onSuccess={getProducts} />
            <div className="w-full border-t-2 border-white mt-4 px-4">
                {productList.length === 0 ? (
                    <p className="text-white text-sm italic mt-4">No hay productos registrados.</p>
                ) : (
                    <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4">
                        {productList.map((cat, idx) => (
                            <div key={idx} className="py-2 border-b border-white text-center">
                                <h2>{cat.name}</h2>
                                <p>{cat.ingredients}</p>
                                <h2>{cat.cost}</h2>
                                {cat.image && (
                                    <Image src={cat.image} width={300} height={300} alt="asd" className='w-full h-40' />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductList
