import React, { useContext } from 'react';
import { useCookies } from "react-cookie";
import '../../css/profile.css';
import { successMsg } from '../../services/feedbackService';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
// Importing useContext Variables
import { UserContext } from '../../App';

function Profile() {
    // Adding User Data into userDetails Variable via UseContext
    const userDetails = useContext(UserContext);
    const navigate = useNavigate();
    const [cookies, setCookie, removeItem] = useCookies();

    // LOGOUT
    const handleLogout = () => {
        removeItem('eShopToken');
        successMsg('You Logged Out Successfully!');
        navigate('/');
    };
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="content-profile-page mt-5 mb-5">
                    <div className="profile-user-page profileCard">
                        <div className="img-user-profile">
                            <img
                                className="profile-bgHome"
                                src="profilebanner.jpg"
                            />
                            <img
                                className="avatar"
                                src="profilevector.jpg"
                                alt="jofpin"
                            />
                        </div>
                        <div className="user-profile-data">
                            <h5 className="text-center mt-2">
                                Currently Logged in As:
                            </h5>
                            <h1 className="boldTitle text-center mb-4">
                                <span className="title">
                                    {userDetails.name}
                                </span>
                            </h1>
                        </div>

                        <ul className="data-user">
                            <li>
                                <a className="profileBtns">
                                    <h5 className="forbidden">
                                        Reset Password
                                    </h5>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="profileBtns"
                                    onClick={handleLogout}
                                >
                                    <h5>
                                        <i className="fa-solid fa-power-off"></i>{' '}
                                        Logout
                                    </h5>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
