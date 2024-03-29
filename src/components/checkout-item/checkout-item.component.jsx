import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

export const CheckoutItem = ({ cartItem }) => {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } =
        useContext(CartContext);

    const { imageUrl, name, quantity, price } = cartItem;

    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={removeItemHandler}>
                    &lt;
                </span>
                <span className="value">{quantity}</span>
                <span className="arrow" onClick={addItemHandler}>
                    &gt;
                </span>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={clearItemHandler}>
                {" "}
                &#10005;{" "}
            </div>
        </div>
    );
};