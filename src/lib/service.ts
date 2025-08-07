import { Category, Product } from "@/types/product"
import { supabase } from "./client"

// This functions using in Modules/AdminPage

export async function fetchCategories() {
    const { data, error } = await supabase.from("categorias").select("*")
    if (!error) return data as Category[]
}

export async function saveCategory(category: Category) {
    await supabase.from("categorias").insert([category])
}

export async function fetchProducts() {
    const { data, error } = await supabase.from("productos").select("*")
    if (!error) return data as Product[]
}

export async function InsertProduct(product: Product) {
    await supabase.from("productos").insert([product])
}

// DELETE

export async function deleteProduct(id: number) {
    await supabase.from("productos").delete().eq("id", id)
}


