import { useContext } from "react";
import "./product-card.styles.scss";

import Button, {BUTTON_TYPE_CLASS} from "../button/button.component";

import { CartContext } from "../../contexts/cart.context";

function ProductCard({ product }) {

    const { name, price, imageUrl } = product;
    
    const {addItemToCart} = useContext(CartContext);

    function addProductToCart(){
        addItemToCart(product);
    }

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASS.inverted} onClick={ addProductToCart } >Add to Cart</Button>
        </div>
    );
};

export default ProductCard;
