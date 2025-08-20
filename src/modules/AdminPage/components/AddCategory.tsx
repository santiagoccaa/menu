"use client"

import { saveCategory } from "@/lib/service";
import { Category } from "@/types/product";
import { FormEvent, useState } from "react";
import { TbLoader2 } from "react-icons/tb";

const AddCategory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formCategory, setFormCategory] = useState<Category>({
        name: ""
    })

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        try {
            await saveCategory(formCategory)
            setTimeout(() => {
                setFormCategory({ name: "" })
                setIsLoading(false)
            }, 500)
        } catch (err) {
            console.error("Error al guardar categoría:", err)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="py-8 flex justify-center w-full">
            <form onSubmit={handleFormSubmit} className="flex gap-4 items-center">
                <input
                    type="text"
                    className="border-white border-1 rounded-lg p-2" placeholder="Nombre de la Categoria"
                    value={formCategory.name}
                    onChange={(e) => setFormCategory({ ...formCategory, name: e.target.value })}
                />
                <button type="submit" className="bg-blue-500 rounded-lg cursor-pointer p-2" >
                    {
                        isLoading
                            ?
                            <TbLoader2 className="animate-spin" />
                            :
                            "Guardar"
                    }
                </button>
            </form>
        </div>
    )
}

export default AddCategory