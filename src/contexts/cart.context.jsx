import { useEffect, useState } from "react";
import { createContext } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(
        (element) => element.id === productToAdd.id
    );

    if (existingItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem;
        });
    }

    //If the productToAdd is not present in the cartItems
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeFromCart = (cartItems, productToRemove) => {
    const existingItem = cartItems.find(
        (element) => element.id === productToRemove.id
    );

    if (existingItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== productToRemove.id
        );
    } else {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem;
        });
    }
};

const clearItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => [],
    removeItemFromCart: () => [],
    clearItemFromCart: () => [],
    cartQuantity: 0,
    totalPrice: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((acc, curr) => {
            return (acc += curr.quantity);
        }, 0);

        const priceSum = cartItems.reduce((acc, curr) => {
            return (acc += curr.quantity * curr.price);
        }, 0);

        setCartQuantity(total);
        setTotalPrice(priceSum);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartQuantity,
        totalPrice,
        removeItemFromCart,
        clearItemFromCart,
    };

    function addItemToCart(productToAdd) {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    function removeItemFromCart(productToRemove) {
        setCartItems(removeFromCart(cartItems, productToRemove));
    }

    function clearItemFromCart(cartItemToClear) {
        setCartItems(clearItem(cartItems, cartItemToClear));
    }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
