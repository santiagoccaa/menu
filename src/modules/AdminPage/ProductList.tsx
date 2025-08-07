"use client"

import { deleteProduct, fetchProducts } from '@/lib/service'
import { Product } from '@/types/product'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddProducts from './components/AddProducts'
import { TbEdit } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { useParams } from 'next/navigation'

const ProductList = () => {
    const category = useParams().slug as string

    const [productList, setProductList] = useState<Product[]>([])
    const [editProductId, setEditProductId] = useState<number | null>(null)

    const getProducts = async () => {
        const data = await fetchProducts(category)
        if (data) setProductList(data)
    }

    useEffect(() => {
        getProducts()
    })

    const toggleEdit = (idx: number) => {
        setEditProductId(prev => (prev === idx ? null : idx))
    }

    return (
        <div>
            <AddProducts onSuccess={getProducts} />
            <div className="w-full border-t-2 border-white mt-4 px-4">
                {productList.length === 0 ? (
                    <p className="text-white text-sm italic mt-4">No hay productos registrados.</p>
                ) : (
                    <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4">
                        {productList.map((product, idx) => (
                            <div key={idx} className="relative py-2 border-b border-white text-center flex bg-gray-800 rounded-lg p-2">
                                <div className='w-40'>
                                    {product.image && (
                                        <Image src={product.image} width={300} height={300} alt="asd" className='w-full h-40' />
                                    )}
                                </div>
                                <div className='flex flex-col gap-2 text-left pl-4'>
                                    <h2 className='text-xl font-bold capitalize'>{product.name}</h2>
                                    <p className='text-sm'>{product.ingredients}</p>
                                    <h2 className='text-lg font-bold'>$ {product.cost}</h2>
                                </div>

                                <div
                                    className={`absolute overflow-hidden bottom-2 right-2 ${editProductId === idx ? 'w-48' : 'w-12'} h-12 rounded-full bg-red-400 transition-all duration-300`}
                                >
                                    <div className='relative bg-red-400 w-full h-12'>
                                        <button
                                            onClick={() => toggleEdit(idx)}
                                            className='absolute top-0 right-0 rounded-full bg-red-400 w-12 h-12 flex justify-center items-center cursor-pointer border-1'
                                        >
                                            <AiFillSetting size={24} className={`${editProductId === idx ? 'rotate-90' : ''} duration-300`} />
                                        </button>
                                        <div className={`flex gap-8 px-8 h-full items-center bg-white`}>
                                            <button className='cursor-pointer text-gray-800 0 hover:scale-110 transition-all duration-300'>
                                                <TbEdit size={20} />
                                            </button>
                                            <button
                                                className='cursor-pointer text-gray-800 
                                            hover:scale-110 transition-all duration-300'
                                                onClick={() => {
                                                    if (product.id) {
                                                        deleteProduct(product.id)
                                                    }
                                                }}
                                            >
                                                <GoTrash size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductList