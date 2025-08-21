"use client"

import { supabase } from '@/lib/client'
import { InsertProduct } from '@/lib/service'
import { Product } from '@/types/product'
import React, { FormEvent, useRef, useState } from 'react'
import { TbLoader2 } from 'react-icons/tb'

interface AddProductProp {
  category:string
}

const AddProducts = ({ category }: AddProductProp) => {

  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState<Product>({
    name: "",
    ingredients: [],
    cost: 0,
    category: category,
    image: null
  })

  const imageInputRed = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { data, error } = await supabase.storage
        .from("menu-image")
        .upload(`${Date.now()}-${file.name}`, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("menu-image")
        .getPublicUrl(data.path);

      setForm({ ...form, image: publicUrlData.publicUrl });
    } catch (err) {
      console.error("Error subiendo imagen:", err);
    }
  };

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      await InsertProduct(form)
      setTimeout(() => {
        setForm({
          name: "",
          ingredients: [],
          cost: 0,
          category: category,
          image: null
        })
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8">
      <div>
        <label className="text-white text-sm font-bold block">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          className="w-56 border-1 border-white  text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className="text-white text-sm font-bold block">Descripcion</label>
        <input
          type="text"
          name="ingredients"
          value={form.ingredients}
          className="w-56 border-1 border-white text-white text-sm p-1 rounded-md"
          onChange={(e) =>
            setForm({ ...form, ingredients: e.target.value.split(",").map(i => i.trim()) })
          }
        />
      </div>
      <div>
        <label className="text-white text-sm font-bold block">Cost</label>
        <input
          type="number"
          name="cost"
          value={form.cost}
          className="w-56 border-1 border-white  text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
        />
      </div>
      <div>
        <label className="text-white text-sm font-bold block">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          className="w-56 border-1 border-white  text-sm p-1 rounded-md"
          disabled
        />
      </div>
      <div>
        <label className="text-white text-sm font-bold block">image</label>
        <input
          type="file"
          ref={imageInputRed}
          className="hidden"
          onChange={handleImageUpload}
        />

        <button
          type='button'
          className="w-56 border-1 border-white  text-sm p-1 rounded-md"
          onClick={() => imageInputRed.current?.click()}
        >
          Subir Imagen
        </button>
      </div>

      <button type="submit" value="Guardar" className="bg-blue-500 border-1 border-blue-500 w-52 rounded-md cursor-pointer hover:bg-white hover:text-blue-500 font-bold duration-300 h-12" >
        {
          isLoading
            ?
            <TbLoader2 className="animate-spin" />
            :
            "Guardar"
        }
      </button>
    </form>
  )
}

export default AddProducts
