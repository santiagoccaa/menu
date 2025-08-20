"use client"

import { fetchCategories, fetchProducts } from "@/lib/service";
import { Category, Product } from "@/types/product";
import { createContext, ReactNode, useState } from "react";

interface MenuContextTypes {
    handleClickModal: () => void
    openModal: boolean
    handleFetchProducts: (categoria: string) => Promise<void>
    fetchProductsList: Product[]
    handleFectAllCategoryes: () => Promise<void>
    AllCategoryes: Category[]
}

const MenuContext = createContext<MenuContextTypes>({
    handleClickModal: () => { },
    openModal: false,
    handleFetchProducts: async () => { },
    fetchProductsList: [],
    handleFectAllCategoryes: async () => { },
    AllCategoryes: [],
});

interface MenuProviderProps {
    children: ReactNode;
}

const MenuProvider = ({ children }: MenuProviderProps) => {
    const [openModal, setOpenModal] = useState(false)
    const [fetchProductsList, setFetchProductsList] = useState<Product[]>([])
    const [AllCategoryes, setAllCategoryes] = useState<Category[]>([])

    // Abre y cierra el Modal
    const handleClickModal = () => {
        setOpenModal(!openModal)
    }

    // Trae todos los productos de la categoria respectiva
    const handleFetchProducts = async (categoria: string): Promise<void> => {
        const products = await fetchProducts(categoria);
        setFetchProductsList(products ?? []);
    };

    // Trae todas las categorias
    const handleFectAllCategoryes = async () => {
        const categoryes = await fetchCategories()
        setAllCategoryes(categoryes ?? [])
    }
    return (
        <MenuContext.Provider
            value={{
                handleClickModal,
                openModal,
                handleFetchProducts,
                fetchProductsList,
                handleFectAllCategoryes,
                AllCategoryes
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export { MenuProvider };
export default MenuContext;
