import MenuContext from "@/context/MenuContext";
import { useContext } from "react";

export const useMenu = () => {
    return useContext(MenuContext)
}
