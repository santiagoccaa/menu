"use client"

import { supabase } from "@/lib/client"
import { Product } from "@/types/product";
import { FormEvent, useState } from "react";

const InsertProduct = () => {

  //const [product, setProduct] = useState<Product[]>([])
  const [form, setForm] = useState<Product>({
    name: "",
    ingredients: [],
    cost: 0,
    category: "",
    image: ""
  })

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log("Enviando a Supabase:", JSON.stringify(form, null, 2));
    const { error } = await supabase.from<Product>("productos").insert([form])

    if (error) {
      console.log("ERROR", error.message);
    } else {
      console.log("SIn errores");
    }

  }
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="bg-white flex flex-col gap-4 py-12 justify-center items-center">
        <label className="text-lg text-black">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          className="w-96 border-1 border-black text-blue-400"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label className="text-lg text-black">Ingredientes</label>
        <input
          type="text"
          name="ingredients"
          value={form.ingredients}
          className="w-96 border-1 border-black text-blue-400"
          onChange={(e) =>
            setForm({ ...form, ingredients: e.target.value.split(",").map(i => i.trim()) })
          }
        />
        <label className="text-lg text-black">Cost</label>
        <input
          type="number"
          name="cost"
          value={form.cost}
          className="w-96 border-1 border-black text-blue-400"
          onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
        />
        <label className="text-lg text-black">Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          className="w-96 border-1 border-black text-blue-400"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <label className="text-lg text-black">image</label>
        <input
          type="text"
          name="image"
          value={form.image}
          className="w-96 border-1 border-black text-blue-400"
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <input type="submit" value="enviar" className="bg-blue-500 w-72" />
      </form>
    </div>
  )
}

export default InsertProduct
