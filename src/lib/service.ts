import { Category, Ofert, Product } from "@/types/product"
import { supabase } from "./client"

// This functions using in Modules/AdminPage

export async function fetchCategories() {
    const { data, error } = await supabase.from("categorias").select("*").order("id", { ascending: true })
    if (!error) return data as Category[]
}

export async function saveCategory(category: Category) {
    await supabase.from("categorias").insert([category])
}

export async function fetchProducts(category: string) {
    const { data, error } = await supabase.from("productos").select("*").eq("category", category).order("id", { ascending: true })
    if (!error) return data as Product[]
}

export async function InsertProduct(product: Product) {
    await supabase.from("productos").insert([product])
}

// ----------DELETE

//Product
export async function deleteProduct(id: number) {
    await supabase.from("productos").delete().eq("id", id)
}

//Category
export async function deleteCategory(id: number) {
    await supabase.from("categorias").delete().eq("id", id)
}

// -----------EDIT

//Producto
export async function EditProduct(id: number, product: Partial<Product>) {
    await supabase.from("productos").update({ name: product.name, ingredients: product.ingredients, cost: product.cost, image: product.image }).eq("id", id)
}

//Category
export async function EditCategory(id: number, newName: string) {
    await supabase.from("categorias").update({ name: newName }).eq("id", id)
}

// ---------- ADD OFERT

export async function addOfert({ id, type, ofert }: Ofert) {
    await supabase.from("productos").update({ tipo_oferta: type, oferta: ofert }).eq("id", id)
}

// ---------- EDIT OFERT

export async function editOfert(id: number) {
    await supabase.from("productos").update({ tipo_oferta: "", oferta: "" }).eq("id", id)
}
