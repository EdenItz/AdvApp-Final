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
                                className="avatar"
                                src="data:image/jpeg;base64,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"
                            />
                            {/* <img
                                className="avatar"
                                src="profilevector.jpg"
                                alt="jofpin"
                            /> */}
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
