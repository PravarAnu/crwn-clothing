import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import  {CartDropdownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles.jsx";

function CartDropdown() {
    const { cartItems } = useContext(CartContext);

    const navigate = useNavigate();

    function navigateToCheckout() {
        navigate("/checkout");
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => {
                        return <CartItem key={item.id} {...item} />;
                    })
                ) : (
                    <EmptyMessage>Your Cart Is Empty</EmptyMessage>
                )}
            </CartItems>

            <Button onClick={navigateToCheckout}>Checkout</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;
