import { Ofert, Product } from "@/types/product"
import { supabase } from "./client"
import { CategorysType, ProductsType } from "@/types/types"

// This functions using in Modules/AdminPage

// Tarer all categorias
export async function fetchCategories() {
    const { data, error } = await supabase.from("categorias_menu").select("*").order("id", { ascending: true })
    if (!error) return data as CategorysType[]
}

// Guardar Categoria
export async function saveCategory({ name, id }: CategorysType) {
    await supabase.from("categorias_menu").insert({ id: id, name: name })
}

// Traes all products
export async function fetchProducts(category: string) {
    const { data, error } = await supabase.from("productos").select("*").eq("category", category).order("id", { ascending: true })
    if (error || !data) {
        return [];
    }

    return data as Product[];
}

// Insertar producto
export async function insertProduct(product: ProductsType) {
    await supabase.from("productos").insert([product])
}

// ----------DELETE

//Product
export async function deleteProduct(id: number) {
    await supabase.from("productos").delete().eq("id", id)
}

//Category
export async function deleteCategory(id: string) {
    await supabase.from("categorias_menu").delete().eq("id", id)
}

// -----------EDIT

//Producto
export async function EditProduct(id: number, product: Partial<Product>) {
    await supabase.from("productos").update({ name: product.name, ingredients: product.ingredients, cost: product.cost, image: product.image }).eq("id", id)
}

//Category
export async function EditCategory(id: string, newName: string) {
    await supabase.from("categorias_menu").update({ name: newName }).eq("id", id)
}

// EDIT CATEGORY PRODUCTS
export async function EditCategoryProducts(categoriUpdate: string, editCategoryName: string) {
    await supabase.from("productos_menu").update({ category_product: editCategoryName.toLowerCase().trim() }).eq("category_product", categoriUpdate)
}

// ---------- ADD OFERT

export async function addOfert({ id, type, ofert }: Ofert) {
    await supabase.from("productos").update({ tipo_oferta: type, oferta: ofert }).eq("id", id)
}

// ---------- EDIT OFERT

export async function editOfert(id: number) {
    await supabase.from("productos").update({ tipo_oferta: "", oferta: "" }).eq("id", id)
}


