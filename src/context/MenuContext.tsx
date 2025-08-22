"use client"

import { fetchCategories, fetchProducts } from "@/lib/service";
import { Product } from "@/types/product";
import { CategorysType } from "@/types/types";
import { createContext, ReactNode, useCallback, useState } from "react";

interface MenuContextTypes {
    handleClickModal: () => void
    openModal: boolean
    handleFetchProducts: (categoria: string) => Promise<void>
    fetchProductsList: Product[]
    handleFectAllCategoryes: () => Promise<void>
    AllCategoryes: CategorysType[]
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
    const [AllCategoryes, setAllCategoryes] = useState<CategorysType[]>([])

    // Abre y cierra el Modal
    const handleClickModal = useCallback(() => {
        setOpenModal(prev => !prev)
    }, [])

    const handleFetchProducts = useCallback(async (categoria: string): Promise<void> => {
        const products = await fetchProducts(categoria);
        setFetchProductsList(products ?? []);
    }, []);

    // ✅ Envolver en useCallback para evitar recreación
    const handleFectAllCategoryes = useCallback(async () => {
        const categoryes = await fetchCategories()
        setAllCategoryes(categoryes ?? [])
    }, [])
    
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
