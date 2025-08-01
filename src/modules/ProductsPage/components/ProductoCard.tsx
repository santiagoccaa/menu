import { Product } from "@/types/product";
import Image from "next/image";

interface ProductoCardProps {
  product: Product
}

const ProductoCard = ({ product }: ProductoCardProps) => {
  return (
    <div className="border p-2 rounded shadow flex h-52">
      <div className="w-2/5 bg-blue-200 bg-center relative">
        <Image src={`/menu/${product.category}/${product.image}`} fill alt={product.name} />
      </div>
      <div className="flex flex-col w-3/5 pl-4 relative">
        <h2 className="text-lg md:text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-sm font-light">{product.ingredients.join(', ')}</p>
        <h2 className="absolute bottom-0 left-4">${product.cost}</h2>
      </div>
    </div>
  )
}

export default ProductoCard
