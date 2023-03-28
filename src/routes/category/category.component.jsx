import { useParams } from "react-router-dom";
import {CategoryContainer, CategoryTitle} from "./category.styles";

import { useContext, useState, useEffect } from "react";

import { CategoriesContext } from "../../contexts/categories.context";

import ProductCard from "../../components/product-card/product-card.component";


const Category = () =>{
    const { category } = useParams(); 

    const { categories } = useContext(CategoriesContext);

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        setProducts(categories[category]);
    }, [categories, category])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
          
            <CategoryContainer>
                {   products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </>
    )
}


export default Category;