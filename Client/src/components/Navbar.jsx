import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { getProductsInCart } from '../services/cartService';
import { successMsg, errorMsg } from '../services/feedbackService';
import appLogo from '../assets/logo.png';
import '../css/navbar.css';
import '../css/home.css';

// Importing useContext Variables
import { TokenContext, UserContext, UserCounterContext } from '../App';

// Globals

function Navbar(props) {
    // Adding Token into setToken Variable via UseContext
    const setToken = useContext(TokenContext);
    const userDetails = useContext(UserContext);
    const userCounter = useContext(UserCounterContext);
    const [isChanged, setIsChanged] = useState(false);
    const [cart, setCart] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeItem] = useCookies();
    // Getting CartChange props from Product Details Component and Listening to changes in useEffect Dependency
    const cartChange = props.cartChange;

    // Getting cartRender props from Cart Component and Listening to changes in useEffect Dependency
    const cartRender = props.cartRender;

    // LOGOUT
    const handleLogout = () => {
        setIsChanged(!isChanged);
        removeItem('eShopToken');
        removeItem('eShopUserID');
        setToken('');
        successMsg('You Logged Out Successfully!');
        navigate('/');
        navigate(0);
    };

    React.useEffect(() => {
        if (cookies.eShopToken) {
            // Get Products From Cart
            getProductsInCart(cookies.eShopToken, cookies.eShopUserID)
                .then(result => {
                    setCart(result.data);
                })
                .catch(err => {
                    errorMsg('Something went wrong.. Try Again!');
                });
        }
        // Listning to cartChange (ProductDetails) and cartRender(Cart) and Updates Cart Badge in Navbar
    }, [isChanged, cartChange, cartRender]);

    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-dark navbar-dark"
                id="navBar"
            >
                <div className="container">
                    <NavLink to="/">
                        <img className="navLogo" src={appLogo} alt="Logo"></img>
                    </NavLink>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/women">
                                    Women
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/men">
                                    Men
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/kids">
                                    Kids
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/shoes&bags">
                                    Shoes & Bags
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/accessories">
                                    Accessories
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>

                            {userDetails.isAdmin && (
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link text-success adminPanelLink"
                                        to="/admin-panel"
                                    >
                                        <i className="fa-solid fa-unlock"></i>
                                        Admin Panel
                                    </NavLink>
                                </li>
                            )}
                            <NavDropdown
                                title={
                                    <span className="navName">
                                        {cookies.eShopToken && userDetails.name}
                                    </span>
                                }
                                id="basic-nav-dropdown"
                            >
                                {!cookies.eShopToken && (
                                    <>
                                        <NavDropdown.Item href="/login">
                                            Login
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/register">
                                            Register
                                        </NavDropdown.Item>
                                    </>
                                )}

                                {cookies.eShopToken && (
                                    <>
                                        <NavDropdown.Item href="/ordersHistory">
                                            Orders History
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/profile">
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </>
                                )}
                            </NavDropdown>
                        </ul>

                        <div className="nav-item dropdown text-light">
                            <NavLink
                                className="position-relative navLink"
                                to="/cart"
                            >
                                {cart.length ? (
                                    <>
                                        <i className="fa-solid fa-bag-shopping fa-lg hoverIcon navLink"></i>
                                        <span className="badge position-absolute top-0 start-100 translate-middle rounded-pill text-bg-danger">
                                            {cart.length}
                                        </span>
                                    </>
                                ) : (
                                    <i className="fa-solid fa-bag-shopping fa-lg hoverIcon navLink"></i>
                                )}
                            </NavLink>
                        </div>

                        <div>
                            <NavLink className="nav-link nav-user-counter">
                                Number of connected users: {userCounter}
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
