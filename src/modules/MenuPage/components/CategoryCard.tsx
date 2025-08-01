import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
    name: string,
    icon: string,
    color: string,  
    slug: string
}

const CategoryCard = ({ name, icon, color, slug }: CategoryCardProps) => {
    return (
        <Link href={`productos/${slug}`}>
            <div className={`flex items-center w-96 h-32 ${color} rounded-xl shadow-lg outline-1 outline-black -outline-offset-8 hover:-outline-offset-1 group duration-300 hover:shadow-white cursor-pointer`}>
                <div className="w-2/5 px-5">
                    <Image src={`/${icon}`} width={80} height={90} alt={name} className="group-hover:scale-90 duration-300" />
                </div>
                <h2 className="text-2xl">{name}</h2>
            </div>
        </Link>
    )
}

export default CategoryCard