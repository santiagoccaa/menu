"use client"

import { supabase } from '@/lib/client'
import { Product } from '@/types/product'
import { useParams } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'

const InsertProduct = () => {
  const category = useParams().slug as string

  const [productList, setProductList] = useState<Product[]>([])
  async function fetchProducts() {
    const { data, error } = await supabase.from("productos").select("*")
    if (error) console.error(error)
    else setProductList(data as Product[])
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const [form, setForm] = useState<Product>({
    name: "",
    ingredients: [],
    cost: 0,
    category: category,
    image: ""
  })

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { error } = await supabase.from("productos").insert([form])

    if (error) {
      console.log("ERROR", error.message);
    } else {
      console.log("SIn errores");
      fetchProducts()
    }

  }
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 h-40 overflow-hidden">
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
            type="text"
            name="image"
            value={form.image}
            className="w-56 border-1 border-white  text-sm p-1 rounded-md"
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>

        <input type="submit" value="Guardar" className="bg-blue-500 border-1 border-blue-500 w-52 rounded-md cursor-pointer hover:bg-white hover:text-blue-500 font-bold duration-300 h-12" />
      </form>

      <div className="w-full border-t-2 border-white mt-4 px-4">
        {productList.length === 0 ? (
          <p className="text-white text-sm italic mt-4">No hay productos registrados.</p>
        ) : (
          <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4">
            {productList.map((cat, idx) => (
              <div key={idx} className="py-2 border-b border-white text-center">
                {cat.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InsertProduct
