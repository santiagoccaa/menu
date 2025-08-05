import { Product } from "@/types/product"
import { supabase } from "./client"

/**
 * Get ALL produnts
*/
export async function GetProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("productos").select("*")
  if (error) {
    console.error("Error fetching products:", error.message)
    return []
  }
  return data as Product[]
}

/**
 * INSERT product in table
*/
export async function InsertProduct(product: Product) {
  const { error } = await supabase.from("productos").insert([product])
  if (error) {
    console.error("Error inserting product:", error.message)
    throw error
  }
}

/**
 * Get produnts for ID
*/
export async function GetProductsId(category: string): Promise<Product[]> {
  const { data, error } = await supabase.from("productos").select("*").eq("category", category)
  if (error) {
    console.error("Error fetching products:", error.message)
    return []
  }
  return data as Product[]
}