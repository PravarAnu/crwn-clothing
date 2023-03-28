import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/react.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer, NavLink, NavLinks, LogoContainer} from "./navigation.style";

function Navigation() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    console.log(currentUser);

    const signOutHandler = async () => {
        await signOutUser();

        setCurrentUser(null);
    };

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <Logo className="logo" />
                </LogoContainer>

                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as="span" onClick={signOutHandler}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/authentication">
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {
                    isCartOpen && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;
