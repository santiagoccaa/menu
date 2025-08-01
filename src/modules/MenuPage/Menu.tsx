import { categories } from "@/data/categories"
import CategoryCard from "./components/CategoryCard"

const Menu = () => {
  return (
    <div className="flex flex-col gap-6 items-center px-2 md:px-4">
        {categories.map(({ icon, id, name, color, slug }) => (
          <CategoryCard key={id} icon={icon} name={name} color={color} slug={slug} />
        ))}
    </div>
  )
}

export default Menu
