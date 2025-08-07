"use client"

import { Category } from "@/types/product"
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategories } from "@/lib/service";
import AddCategory from "./components/AddCategory";

const AdminPage = () => {

    const [categories, setCategories] = useState<Category[]>([])

    const getCategories = async () => {
        const data = await fetchCategories()
        if (data) setCategories(data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='mx-4 border-t border-white flex flex-col'>
            <AddCategory onSuccess={getCategories} />
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
