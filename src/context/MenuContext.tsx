"use client"

import { fetchProducts } from "@/lib/service";
import { Product } from "@/types/product";
import { createContext, ReactNode, useState } from "react";

interface MenuContextTypes {
    handleClickModal: () => void
    openModal: boolean
    getProducts: (category: string) => Promise<Product[] | undefined>
}

const MenuContext = createContext<MenuContextTypes>({
    handleClickModal: () => { },
    openModal: false,
    getProducts: () => Promise.resolve([] as Product[])
});

interface MenuProviderProps {
    children: ReactNode;
}

const MenuProvider = ({ children }: MenuProviderProps) => {
    const [openModal, setOpenModal] = useState(false)

    const handleClickModal = () => {
        setOpenModal(!openModal)
    }

    const getProducts = async (category: string) =>{
        const data = await fetchProducts(category)
        return data
    }

    return (
        <MenuContext.Provider
            value={{
                handleClickModal,
                openModal,
                getProducts
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export { MenuProvider };
export default MenuContext;