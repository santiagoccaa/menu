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

export async function fetchProducts(category: string) {
    const { data, error } = await supabase.from("productos").select("*").eq("category", category)
    if (!error) return data as Product[]
}

export async function InsertProduct(product: Product) {
    await supabase.from("productos").insert([product])
}

// -DELETE

//Product
export async function deleteProduct(id: number) {
    await supabase.from("productos").delete().eq("id", id)
}

//Category
export async function deleteCategory(id: number) {
    await supabase.from("categorias").delete().eq("id", id)
}
