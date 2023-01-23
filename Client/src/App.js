// ** React Imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useWebSocket from 'react-use-websocket';
import { useCookies } from "react-cookie";


// ** Components Imports

import Products from '../src/components/Products';
import ProductDetails from '../src/components/pages/ProductDetails';
import ScrollToTop from './components/ScrollToTop';

///  ** Pages Imports
import Cart from '../src/components/pages/Cart';
import About from '../src/components/pages/About';
import Profile from '../src/components/pages/Profile';
import HomePage from '../src/components/pages/HomePage';
import Login from './components/pages/login/Login';
import AdminPanel from '../src/components/pages/AdminPanel';
import Pnf from '../src/components/pages/Pnf';
import AdminProtectedRoutes from './components/AdminProtectedRoutes';
import UserProtectedRoutes from './components/UserProtectedRoutes';

// ** Services Imports
import { getUser } from '../src/services/userService';
import { errorMsg } from '../src/services/feedbackService';

// ** CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Creating and Exporting useContext to Token (Session Storage) & UserDetails
export const TokenContext = React.createContext();
export const UserContext = React.createContext();
export const UserCounterContext = React.createContext();

import Globals from './globals';


function App() {
    const [userDetails, setUserDetails] = useState('');
    const [cookies] = useCookies();
    const { lastMessage } = useWebSocket(Globals.websocketHost);


    React.useEffect(() => {
        if (cookies.eShopToken) {
            getUser()
                .then(result => {
                    setUserDetails(result.data);
                })
                .catch(err => {
                    errorMsg('Something went wrong.. Try Again!');
                });
        } else {
            setUserDetails('');
        }
    }, [cookies.eShopToken]);

    return (
        <div className="App">
            <ToastContainer />
            {/* Wrapping / Passing Token & UserDetails to all components with UseContext */}
            <UserContext.Provider value={userDetails}>
                <TokenContext.Provider value={() => {}}>
                    <UserCounterContext.Provider value={(lastMessage && lastMessage.data) || 0}>
                        <Router>
                            <ScrollToTop />
                            <Routes>
                                {/* HOME PAGE */}
                                <Route path="/" element={<HomePage />} />

                                {/* REGISTER */}
                                <Route
                                path="/register"
                                element={<Login register={true} />}
                            />

                                {/* LOGIN */}
                                <Route
                                    path="/login"
                                    element={<Login setToken={() => {}} />}
                                />
                                
                                {/* shoes&bags */}
                            <Route
                                path="/shoes&bags"
                                element={<Products category={'Shoes&Bags'} />}
                            />

                                {/* WOMENS */}
                                <Route
                                    path="/women"
                                    element={<Products category={'Women'} />}
                                />

                                {/* MENS */}
                                <Route
                                    path="/men"
                                    element={<Products category={'Men'} />}
                                />

                                {/* KIDS */}
                                <Route
                                    path="/kids"
                                    element={<Products category={'Kids'} />}
                                />

                                {/* ACCESSORIES */}
                                <Route
                                    path="/accessories"
                                    element={<Products category={'Accessories'} />}
                                />

                                {/* ABOUT US */}
                                <Route path="/about" element={<About />} />

                                {/* CART */}
                                <Route path="/cart" element={<Cart />} />

                                {/* USERS PROFILE (With Guard) */}
                                <Route
                                    element={
                                        <UserProtectedRoutes user={userDetails} />
                                    }
                                >
                                    <Route path="/profile" element={<Profile />} />
                                </Route>

                                {/* PRODUCT DETAILS */}
                                <Route
                                    path="product/:id"
                                    element={<ProductDetails />}
                                />

                                {/* PROTECTED ROUTES (ADMIN ONLY) */}
                                <Route
                                    element={
                                        <AdminProtectedRoutes user={userDetails} />
                                    }
                                >
                                    <Route path="/admin-panel">
                                        <Route index element={<AdminPanel />} />
                                    </Route>
                                </Route>

                                <Route path="*" element={<Pnf />} />
                            </Routes>
                        </Router>
                    </UserCounterContext.Provider>
                </TokenContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
