"use client"

import { deleteProduct, EditProduct } from '@/lib/service'
import { ModalProps, Product } from '@/types/product'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { TbEdit, TbLoader2 } from "react-icons/tb";
import { AiFillSetting } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MdOutlineSaveAlt, MdOutlineNotInterested, MdOutlineDiscount } from "react-icons/md";
import { supabase } from '@/lib/client'
import ModalProduct from '@/components/modal/Modal'
import { useMenu } from '@/hook/useMenu'
import AddProducts from './components/AddProducts'
import { useParams } from 'next/navigation'

const ProductList = () => {

    const categoryURL = useParams().slug as string

    const { handleClickModal, fetchProductsList, handleFetchProducts } = useMenu()

    const [editProductId, setEditProductId] = useState<number | null>(null)
    const [editProduct, setEditProduct] = useState<number | null>(null)
    const [editProductData, setEditProductData] = useState<Partial<Product>>({})
    const [loading, setLoading] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<ModalProps | null>(null);

    const editImage = useRef<HTMLInputElement>(null)

    const toggleEdit = (idx: number) => {
        setEditProductId(prev => (prev === idx ? null : idx))
    }

    const hiddenProduct = async (id: number, stock: boolean) => {
        await supabase.from('productos').update({ stock: stock }).eq("id", id)
    }

    useEffect(() => {
        handleFetchProducts(categoryURL)
    }, [categoryURL, handleFetchProducts])

    return (
        <div>
            {/* TODO: hacer que la categoria donde se añadiran los productos sea la seleccionada */}
            <AddProducts category={categoryURL} />

            {/* Modal Ofert */}
            <ModalProduct
                product={selectedProduct}
            />
            <div className="w-full border-t-2 border-white mt-4 px-4">

                {fetchProductsList.length === 0
                    ?
                    <p className="text-white text-sm italic mt-4">No hay productos registrados.</p>
                    :
                    <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4">
                        {fetchProductsList.map((product, idx) => (
                            <div key={idx} className={`relative py-2 border-b border-white text-center flex bg-gray-800 rounded-lg p-2 ${!product.stock && 'opacity-70 grayscale-50'}`}>
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
                                        <div className="w-40 relative">
                                            {product.image && (
                                                <Image src={product.image} width={300} height={300} alt="asd" className='w-full h-40' />
                                            )}
                                            {
                                                product.tipo_oferta === "promocion"
                                                &&
                                                <h2 className='absolute bottom-0 opacity-80 bg-red-400 w-full text-xl font-bold'>{product.oferta}</h2>
                                            }
                                        </div>
                                        <div className='flex flex-col text-left pl-4'>
                                            <h2 className='text-xl font-bold capitalize'>{product.name}</h2>
                                            <p className='text-sm'>{product.ingredients}</p>
                                            <div className='text-lg font-bold flex gap-2'>
                                                {product.tipo_oferta === "descuento"
                                                    ?
                                                    <>
                                                        <h3 className='flex gap-2 line-through text-gray-400'>${product.cost}

                                                        </h3>
                                                        <span className='text-red-500'>
                                                            ${product.cost - (product.cost * (Number(product.oferta) / 100))}
                                                        </span>
                                                    </>
                                                    :
                                                    product.cost}
                                            </div>
                                        </div>
                                    </>
                                }
                                <div className='absolute top-4 right-4'>
                                    {!product.stock && <h3 className='text-red-500 font-bold'>Agotado</h3>}
                                </div>
                                <div
                                    className={`absolute overflow-hidden bottom-2 right-2 ${editProductId === idx ? 'w-64' : 'w-12'} h-12 rounded-full transition-all duration-300`}
                                >
                                    <div className='relative w-full h-12'>
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
                                        {/* SETTINGS PRODUCTS */}
                                        <div className={`flex gap-6 px-8 h-full items-center bg-white ${editProductId !== idx && 'hidden'}`}>
                                            {/* Edit Product */}
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
                                            {/* Hidden product */}
                                            <button
                                                className='cursor-pointer text-gray-800 0 hover:scale-110 transition-all duration-300'
                                                onClick={() => {
                                                    if (product.id) {
                                                        hiddenProduct(product.id, !product.stock)
                                                        setTimeout(() => {
                                                        }, 1000);
                                                    }
                                                }}
                                            >
                                                <MdOutlineNotInterested size={20} />
                                            </button>
                                            {/* Aplicate ofert */}
                                            <button
                                                className='cursor-pointer text-gray-800 0 hover:scale-110 transition-all duration-300'
                                                onClick={() => {
                                                    setSelectedProduct({
                                                        id: product.id!,
                                                        name: product.name,
                                                        image: product.image!,
                                                        cost: product.cost,
                                                        ofert: product.oferta!,
                                                        type_ofert: product.tipo_oferta!
                                                    })
                                                    handleClickModal()
                                                }}
                                            >
                                                <MdOutlineDiscount size={20} />
                                            </button>
                                            {/* Delete Product */}
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
                }
            </div>
        </div >
    )
}

export default ProductList