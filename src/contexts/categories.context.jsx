import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


export const CategoriesContext = createContext({
    categories: {},
});

export function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState({});
    const value = { categories };

    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const catogeryMap = await getCategoriesAndDocuments();
            setCategories(catogeryMap);
            console.log(catogeryMap);
        }

        getCategoriesMap()
    }, [])

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}
