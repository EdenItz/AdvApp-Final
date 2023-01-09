import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getProductsInCart } from '../services/cartService';
import { successMsg, errorMsg } from '../services/feedbackService';
import appLogo from '../assets/logo.png';
import '../css/navbar.css';
import '../css/home.css';

// Importing useContext Variables
import { TokenContext, UserContext } from '../App';

function Navbar(props) {
    // Adding Token into setToken Variable via UseContext
    const setToken = useContext(TokenContext);
    const userDetails = useContext(UserContext);
    const [isChanged, setIsChanged] = useState(false);
    const [cart, setCart] = useState('');
    const navigate = useNavigate();
    const isLogged = sessionStorage.getItem('token');

    // Getting CartChange props from Product Details Component and Listening to changes in useEffect Dependency
    const cartChange = props.cartChange;

    // Getting cartRender props from Cart Component and Listening to changes in useEffect Dependency
    const cartRender = props.cartRender;

    // LOGOUT
    const handleLogout = () => {
        setIsChanged(!isChanged);
        sessionStorage.removeItem('token');
        setToken('');
        successMsg('You Logged Out Successfully!');
        navigate('/');
    };

    React.useEffect(() => {
        if (isLogged) {
            // Get Products From Cart
            getProductsInCart()
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
                        <img className="navLogo" src={appLogo} alt="Logo" ></img>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                        </ul>
                        <div className="nav-item dropdown text-light">
                            {/* CART */}
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
                        <div className="nav-item dropdown text-light">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fa-solid fa-user fa-lg hoverIcon"></i>
                                <span className="navName">
                                    {isLogged && userDetails.name}
                                </span>
                            </a>
                            <ul className="dropdown-menu">
                                {!isLogged && (
                                    <>
                                        <li>
                                            <NavLink
                                                className="dropdown-item"
                                                to="/login"
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="dropdown-item"
                                                to="/register"
                                            >
                                                Register
                                            </NavLink>
                                        </li>
                                    </>
                                )}

                                {isLogged && (
                                    <>
                                        <li>
                                            <NavLink
                                                className="dropdown-item"
                                                to="/profile"
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a
                                                onClick={handleLogout}
                                                className="dropdown-item"
                                            >
                                                <i className="fa-solid fa-power-off"></i>{' '}
                                                Logout
                                            </a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
