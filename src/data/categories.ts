interface Categories {
    id:number,
    name:string,
    slug:string,
    icon:string,
    color:string
}

export const categories: Categories[] = [
    {
        id: 1,
        name: "Donals",
        slug: "donals", 
        icon: "menu/1-Categorias/icono_dona.svg",
        color: "bg-pink-200",
    },
    {
        id: 2,
        name: "Hamburguesas",
        slug: "hamburguesas",
        icon: "menu/1-Categorias/icono_hamburguesa.svg",
        color: "bg-orange-200",
    },
    {
        id: 3,
        name: "Pastel",
        slug: "pasteles",
        icon: "menu/1-Categorias/icono_pastel.svg",
        color: "bg-purple-200",
    },
    {
        id: 4,
        name: "Bebidas",
        slug: "bebidas",
        icon: "menu/1-Categorias/icono_bebida.svg",
        color: "bg-blue-200",
    },
    {
        id: 5,
        name: "Hot Dog",
        slug: "hot-dogs",
        icon: "menu/1-Categorias/icono_hot-dog.png",
        color: "bg-yellow-200",
    },
    {
        id: 6,
        name: "Pizza",
        slug: "pizzas",
        icon: "menu/1-Categorias/icono_pizza.svg",
        color: "bg-green-200",
    },
    {
        id: 7,
        name: "Galletas",
        slug: "galletas",
        icon: "menu/1-Categorias/icono_galletas.svg",
        color: "bg-amber-200",
    },
]