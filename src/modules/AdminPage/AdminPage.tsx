"use client"

import { Category } from "@/types/product"
import { supabase } from "@/lib/client"
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

const AdminPage = () => {

    const [categories, setCategories] = useState<Category[]>([])

    async function fetchCategories() {
        const { data, error } = await supabase.from("categorias").select("*")
        if (error) console.error(error)
        else setCategories(data as Category[])
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const [formCategory, setFormCategory] = useState<Category>({
        name: ""
    })

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { error } = await supabase.from("categorias").insert([formCategory])
        if (!error) {
            setFormCategory({ name: "" })
            fetchCategories()
        }
    }
    return (
        <div className='mx-4 border-t border-white flex flex-col'>
            <div className="py-8 flex justify-center w-full">
                <form onSubmit={handleFormSubmit} className="flex gap-4 items-center">
                    <input
                        type="text"
                        className="border-white border-1 rounded-lg p-2" placeholder="Nombre de la Categoria"
                        value={formCategory.name}
                        onChange={(e) => setFormCategory({ ...formCategory, name: e.target.value })}
                    />
                    <input type="submit" value="Guardar" className="bg-blue-500 rounded-lg cursor-pointer p-2" />
                </form>
            </div>

            {/* TODO: add filter name and date */}
            <div className="w-full border-t-2 border-white mt-4 px-4">
                {categories.length === 0 ? (
                    <p className="text-white text-sm italic mt-4">No hay categorías registradas.</p>
                ) : (
                    <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4">
                        {categories.map((cat, idx) => (
                            <Link href={`/admin/${cat.name}`} key={idx} className="py-2 border-b border-white text-center">
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default AdminPage
