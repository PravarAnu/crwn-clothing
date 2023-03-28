import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {CartIconContainer, ShoppingIcon, ItemCount} from "./cart-icon.styles.jsx";


function CartIcon(){

    const {isCartOpen,setIsCartOpen, cartQuantity} = useContext(CartContext);


    function toggleIsCartOpen(){
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartQuantity}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;