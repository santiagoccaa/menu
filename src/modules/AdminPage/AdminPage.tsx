"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCategory, EditCategory } from "@/lib/service";
import AddCategory from "./components/AddCategory";
import { AiFillSetting } from "react-icons/ai";
import { TbEdit, TbLoader2 } from "react-icons/tb";
import { GoTrash } from "react-icons/go";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useMenu } from "@/hook/useMenu";

/**
 * Page donde se muestran las categorias
 * @returns 
 */
const AdminPage = () => {

    const { handleFectAllCategoryes, AllCategoryes } = useMenu()

    const [settingsCategory, setSettingsCategory] = useState<number | null>(null)
    const [editCagory, setEditCategory] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        handleFectAllCategoryes()
    }, [handleFectAllCategoryes])

    const toggleEdit = (idx: number) => {
        setSettingsCategory(prev => (prev === idx ? null : idx))
    }

    return (
        <div className='mx-4 border-t border-white flex flex-col'>
            <AddCategory />
            {/* TODO: add filter name and date */}
            <div className="w-full border-t-2 border-white mt-4 px-4">
                {AllCategoryes.length === 0 ? (
                    <p className="text-white text-sm italic mt-4">No hay categoryegorías registradas.</p>
                ) : (
                    <div className="text-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {AllCategoryes.map((category, idx) => (
                            <div key={idx} className="relative">
                                {editCagory === idx
                                    ?
                                    <div className="p-4 flex gap-2">
                                        <input
                                            type="text"
                                            value={editCategoryName}
                                            onChange={(e) => setEditCategoryName(e.target.value)}
                                            className="w-full bg-white text-gray-800"
                                        />
                                    </div>
                                    :
                                    <Link
                                        href={`/admin/${category.name}`}
                                        className="flex py-2 text-2xl capitalize bg-red-400 h-24 border-b border-white justify-center items-center rounded-lg hover:text-red-400 hover:bg-white transition-all duration-300">
                                        {category.name}
                                    </Link>
                                }

                                <div
                                    className={`absolute overflow-hidden bottom-2 right-2 ${settingsCategory === idx ? 'w-48' : 'w-12'} h-12 rounded-full bg-red-400 transition-all duration-300 z-50`}
                                >
                                    <div className='relative bg-blue-400 w-full h-12'>
                                        <div className="absolute top-0 right-0 rounded-full bg-blue-400 w-12 h-12 border-1">
                                            {editCagory === idx
                                                ?
                                                <button
                                                    onClick={() => {
                                                        if (category.id && editCategoryName.trim() !== "") {
                                                            setLoading(true)
                                                            EditCategory(category.id, editCategoryName.trim());
                                                            handleFectAllCategoryes()
                                                            setTimeout(() => {
                                                                setEditCategory(null);
                                                                setLoading(false)
                                                            }, 1200)
                                                        }
                                                    }}
                                                    className="w-full h-full flex bg-red-500 rounded-full justify-center items-center cursor-pointer"
                                                    disabled={loading && true}
                                                >
                                                    {loading
                                                        ?
                                                        <TbLoader2 size={25} className="animate-spin" />
                                                        :
                                                        <MdOutlineSaveAlt size={25} />}
                                                </button>
                                                :
                                                <button
                                                    onClick={() => toggleEdit(idx)}
                                                    className='w-full h-full flex justify-center items-center cursor-pointer'
                                                >
                                                    <AiFillSetting size={24} className={`${settingsCategory === idx ? 'rotate-90' : ''} duration-300`} />

                                                </button>
                                            }
                                        </div>
                                        <div className={`flex gap-8 px-8 h-full items-center ${settingsCategory !== idx && 'hidden'}`}>
                                            <button className='cursor-pointer text-gray-800 hover:scale-110 transition-all duration-300'>
                                                <TbEdit
                                                    onClick={() => {
                                                        toggleEdit(idx)
                                                        setEditCategoryName(category.name)
                                                        setEditCategory(idx)
                                                    }}
                                                    size={20}
                                                />
                                            </button>
                                            <button
                                                className='cursor-pointer text-gray-800 hover:scale-110 transition-all duration-300'
                                                onClick={() => {
                                                    if (category.id) {
                                                        deleteCategory(category.id)
                                                        setEditCategory(null);
                                                        setSettingsCategory(null)
                                                        handleFectAllCategoryes()
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
