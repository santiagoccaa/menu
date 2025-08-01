import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseURL || !supabaseKEY) {
  throw new Error("las Variables para usar supabase estan mal");
}

export const supabase = createClient(supabaseURL, supabaseKEY)