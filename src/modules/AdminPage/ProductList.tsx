"use client"

import { deleteProduct, EditProduct, fetchProducts } from '@/lib/service'
import { Product } from '@/types/product'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import AddProducts from './components/AddProducts'
import { TbEdit, TbLoader2 } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { useParams } from 'next/navigation'
import { MdOutlineSaveAlt } from "react-icons/md";
import { supabase } from '@/lib/client'

const ProductList = () => {
    const categoria = useParams().slug as string

    const [productList, setProductList] = useState<Product[]>([])
    const [editProductId, setEditProductId] = useState<number | null>(null)
    const [editProduct, setEditProduct] = useState<number | null>(null)
    const [editProductData, setEditProductData] = useState<Partial<Product>>({})
    const [loading, setLoading] = useState(false)

    const editImage = useRef<HTMLInputElement>(null)

    const getProducts = async () => {
        const data = await fetchProducts(categoria)
        if (data) setProductList(data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const toggleEdit = (idx: number) => {
        setEditProductId(prev => (prev === idx ? null : idx))
    }

    return (
        <div>
            <AddProducts onSuccess={getProducts} category={categoria} />
            <div className="w-full border-t-2 border-white mt-4 px-4">
                {productList.length === 0 ? (
                    <p className="text-white text-sm italic mt-4">No hay productos registrados.</p>
                ) : (
                    <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4">
                        {productList.map((product, idx) => (
                            <div key={idx} className="relative py-2 border-b border-white text-center flex bg-gray-800 rounded-lg p-2">
                                {editProduct === idx
                                    ?
                                    <>
                                        <div>
                                            <input
                                                type="file"
                                                className='hidden'
                                                ref={editImage}
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const { data, error } = await supabase.storage
                                                        .from("menu-image")
                                                        .upload(`${Date.now()}-${file.name}`, file);

                                                    if (error) {
                                                        console.error("Error subiendo imagen:", error);
                                                        return;
                                                    }

                                                    const { data: publicUrlData } = supabase.storage
                                                        .from("menu-image")
                                                        .getPublicUrl(data.path);

                                                    setEditProductData((prev) => ({
                                                        ...prev,
                                                        image: publicUrlData.publicUrl
                                                    }));
                                                }}
                                            />
                                            <button className='w-full h-full p-4 border-1 border-dashed rounded-lg ' onClick={() => editImage.current?.click()}>Nueva imagen</button>
                                        </div>
                                        <div className='flex flex-col pl-4 gap-y-2'>
                                            <input
                                                type="text"
                                                value={editProductData.name ?? ""}
                                                onChange={(e) =>
                                                    setEditProductData((prev) => ({ ...prev, name: e.target.value }))
                                                }
                                                className='border-white border-1 p-1 rounded-lg'
                                            />
                                            <input
                                                type="text"
                                                value={editProductData.ingredients?.join(", ") ?? ""}
                                                onChange={(e) =>
                                                    setEditProductData((prev) => ({
                                                        ...prev,
                                                        ingredients: e.target.value.split(",").map(str => str.trim())
                                                    }))
                                                }
                                                className='border-white border-1 p-1 rounded-lg'
                                            />
                                            <input
                                                type="number"
                                                value={editProductData.cost ?? 0}
                                                onChange={(e) =>
                                                    setEditProductData((prev) => ({
                                                        ...prev,
                                                        cost: Number(e.target.value)
                                                    }))
                                                }
                                                className='border-white border-1 p-1 rounded-lg'
                                            />
                                        </div>
                                    </>

                                    :
                                    <>
                                        <div className='w-40'>
                                            {product.image && (
                                                <Image src={product.image} width={300} height={300} alt="asd" className='w-full h-40' />
                                            )}
                                        </div>
                                        <div className='flex flex-col text-left pl-4'>
                                            <h2 className='text-xl font-bold capitalize'>{product.name}</h2>
                                            <p className='text-sm'>{product.ingredients}</p>
                                            <h2 className='text-lg font-bold'>$ {product.cost}</h2>
                                        </div>
                                    </>
                                }
                                <div
                                    className={`absolute overflow-hidden bottom-2 right-2 ${editProductId === idx ? 'w-48' : 'w-12'} h-12 rounded-full bg-red-400 transition-all duration-300`}
                                >
                                    <div className='relative bg-red-400 w-full h-12'>
                                        <div className="absolute top-0 right-0 rounded-full bg-blue-400 w-12 h-12 border-1">
                                            {
                                                editProduct === idx
                                                    ?
                                                    <button
                                                        onClick={() => {
                                                            if (product.id) {
                                                                setLoading(true)
                                                                EditProduct(
                                                                    product.id, {
                                                                    name: editProductData.name, ingredients: editProductData.ingredients,
                                                                    cost: editProductData.cost,
                                                                    image: editProductData.image ?? product.image
                                                                })
                                                            }
                                                            setTimeout(() => {
                                                                setEditProduct(null)
                                                                getProducts()
                                                                setLoading(false)
                                                            }, 1200);
                                                        }}
                                                        disabled={loading && true}
                                                        className="w-full h-full flex justify-center items-center cursor-pointer"

                                                    >
                                                        {loading
                                                            ?
                                                            <TbLoader2 size={25} className="animate-spin" />
                                                            :
                                                            <MdOutlineSaveAlt size={25} />
                                                        }

                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => toggleEdit(idx)}
                                                        className='w-full h-full flex justify-center items-center cursor-pointer'

                                                    >
                                                        <AiFillSetting size={24} className={`${editProductId === idx ? 'rotate-90' : ''} duration-300`} />
                                                    </button>
                                            }
                                        </div>

                                        <div className={`flex gap-8 px-8 h-full items-center bg-white`}>
                                            <button
                                                onClick={() => {
                                                    setEditProduct(idx)
                                                    toggleEdit(idx)
                                                    setEditProductData({
                                                        name: product.name,
                                                        ingredients: product.ingredients,
                                                        cost: product.cost,
                                                        image: editProductData.image
                                                    })
                                                }}
                                                className='cursor-pointer text-gray-800 0 hover:scale-110 transition-all duration-300'>
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
        </div >
    )
}

export default ProductList