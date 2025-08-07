"use client"

import { Category } from "@/types/product"
import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCategory, fetchCategories } from "@/lib/service";
import AddCategory from "./components/AddCategory";
import { AiFillSetting } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { GoTrash } from "react-icons/go";

const AdminPage = () => {

    const [categoryegories, setCategories] = useState<Category[]>([])
    const [editCategeory, editEditCategory] = useState<number | null>(null)

    const getCategories = async () => {
        const data = await fetchCategories()
        if (data) setCategories(data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const toggleEdit = (idx: number) => {
        editEditCategory(prev => (prev === idx ? null : idx))
    }

    return (
        <div className='mx-4 border-t border-white flex flex-col'>
            <AddCategory onSuccess={getCategories} />
            {/* TODO: add filter name and date */}
            <div className="w-full border-t-2 border-white mt-4 px-4">
                {categoryegories.length === 0 ? (
                    <p className="text-white text-sm italic mt-4">No hay categoryegorías registradas.</p>
                ) : (
                    <div className="text-white grid grid-cols-1 md:grid-cols-4 gap-4">
                        {categoryegories.map((category, idx) => (
                            <div key={idx} className="relative">
                                <Link href={`/admin/${category.name}`} className="flex py-2 text-2xl capitalize bg-red-400 h-24 border-b border-white justify-center items-center rounded-lg hover:text-red-400 hover:bg-white transition-all duration-300">
                                    {category.name}

                                </Link>
                                <div
                                    className={`absolute overflow-hidden bottom-2 right-2 ${editCategeory === idx ? 'w-48' : 'w-12'} h-12 rounded-full bg-red-400 transition-all duration-300 z-50`}
                                >
                                    <div className='relative bg-blue-400 w-full h-12'>
                                        <button
                                            onClick={() => toggleEdit(idx)}
                                            className='absolute top-0 right-0 rounded-full bg-blue-400 w-12 h-12 flex justify-center items-center cursor-pointer border-1'
                                        >
                                            <AiFillSetting size={24} className={`${editCategeory === idx ? 'rotate-90' : ''} duration-300`} />
                                        </button>
                                        <div className={`flex gap-8 px-8 h-full items-center bg-white`}>
                                            <button className='cursor-pointer text-gray-800 0 hover:scale-110 transition-all duration-300'>
                                                <TbEdit size={20} />
                                            </button>
                                            <button
                                                className='cursor-pointer text-gray-800 hover:scale-110 transition-all duration-300'
                                                onClick={() => {
                                                    if (category.id) {
                                                        deleteCategory(category.id)
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

export default AdminPage
