"use client"

import { supabase } from '@/lib/client'
import { insertProduct } from '@/lib/service'
import React, { FormEvent, useRef, useState } from 'react'
import { TbLoader2 } from 'react-icons/tb'
import { ProductsType } from '@/types/types'
import { preGenerateId } from '@/utils/utils'

interface AddProductProp {
  category: string
}

const AddProducts = ({ category }: AddProductProp) => {
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState<ProductsType>({
    id: preGenerateId(),
    name_product: "",
    image_product: "",
    price_product: 0,
    ingredients: [],
    descripcion: "",
    stock: true,
    currency: "COP",
    hasOfert: false,
    type_ofert: "",
    oferta_product: "",
    category_product: category,
    preparation_time: 0,
    is_special: false,
    serving_size: "",
    date_create: new Date(),
    date_update: new Date()
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

      setForm({ ...form, image_product: publicUrlData.publicUrl });
    } catch (err) {
      console.error("Error subiendo imagen:", err);
    }
  };

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      await insertProduct(form)
      setTimeout(() => {
        setForm({
          id: preGenerateId(),
          name_product: "",
          image_product: "",
          price_product: 0,
          ingredients: [],
          descripcion: "",
          stock: true,
          currency: "COP",
          hasOfert: false,
          type_ofert: "",
          oferta_product: "",
          category_product: category,
          preparation_time: 0,
          is_special: false,
          serving_size: "",
          date_create: new Date(),
          date_update: new Date()
        })
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 py-4">
      <div>
        <label className="text-white text-sm font-bold block">Nombre</label>
        <input
          type="text"
          value={form.name_product}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, name_product: e.target.value })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Descripción</label>
        <textarea
          value={form.descripcion}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Ingredientes (separados por coma)</label>
        <input
          type="text"
          value={form.ingredients.join(", ")}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onChange={(e) =>
            setForm({ ...form, ingredients: e.target.value.split(",").map(i => i.trim()) })
          }
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Precio</label>
        <input
          type="number"
          value={form.price_product}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, price_product: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Moneda</label>
        <input
          type="text"
          value={form.currency}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Stock disponible</label>
        <input
          type="checkbox"
          checked={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.checked })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">¿Tiene oferta?</label>
        <input
          type="checkbox"
          checked={form.hasOfert}
          onChange={(e) => setForm({ ...form, hasOfert: e.target.checked })}
        />
      </div>

      {form.hasOfert && (
        <>
          <div>
            <label className="text-white text-sm font-bold block">Tipo de oferta</label>
            <input
              type="text"
              value={form.type_ofert}
              className="w-56 border-1 border-white text-sm p-1 rounded-md"
              onChange={(e) => setForm({ ...form, type_ofert: e.target.value })}
            />
          </div>
          <div>
            <label className="text-white text-sm font-bold block">Detalle de la oferta</label>
            <input
              type="text"
              value={form.oferta_product}
              className="w-56 border-1 border-white text-sm p-1 rounded-md"
              onChange={(e) => setForm({ ...form, oferta_product: e.target.value })}
            />
          </div>
        </>
      )}

      <div>
        <label className="text-white text-sm font-bold block">Categoría</label>
        <input
          type="text"
          value={form.category_product}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          disabled
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Tiempo preparación (minutos)</label>
        <input
          type="number"
          value={form.preparation_time}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, preparation_time: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Plato especial</label>
        <input
          type="checkbox"
          checked={form.is_special}
          onChange={(e) => setForm({ ...form, is_special: e.target.checked })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Tamaño porción</label>
        <input
          type="text"
          value={form.serving_size}
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onChange={(e) => setForm({ ...form, serving_size: e.target.value })}
        />
      </div>

      <div>
        <label className="text-white text-sm font-bold block">Imagen</label>
        <input
          type="file"
          ref={imageInputRed}
          className="hidden"
          onChange={handleImageUpload}
        />

        <button
          type="button"
          className="w-56 border-1 border-white text-sm p-1 rounded-md"
          onClick={() => imageInputRed.current?.click()}
        >
          Subir Imagen
        </button>
      </div>

      <button
        type="submit"
        value="Guardar"
        className="bg-blue-500 border-1 border-blue-500 w-52 rounded-md cursor-pointer hover:bg-white hover:text-blue-500 font-bold duration-300 h-12"
      >
        {isLoading ? <TbLoader2 className="animate-spin" /> : "Guardar"}
      </button>
    </form>
  )
}

export default AddProducts
