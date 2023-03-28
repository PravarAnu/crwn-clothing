import { useContext } from "react";

import CategoryPreview  from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

function CategoriesPreview() {
    const { categories } = useContext(CategoriesContext);

    return (
        <div className="category-preview-container">
            {Object.keys(categories).map((title) => {
                const products = categories[title];

                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </div>
    );
}

export default CategoriesPreview;
