import { Link } from 'react-router-dom';
import '../css/footer.css';

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <>
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-content pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <p className="text-light">E-Shops</p>
                                    </div>
                                    <div className="footer-text">
                                        <p>about out store !!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                        <div className="row">
                                            <div className="col-6">
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/women"
                                                    >
                                                        Women Clothing
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/men"
                                                    >
                                                        Men Clothing
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/kids"
                                                    >
                                                        Kids
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/accecories"
                                                    >
                                                        Accecories
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/plus-size"
                                                    >
                                                        Plus Size
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/"
                                                    >
                                                        Home
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/register"
                                                    >
                                                        Register
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/login"
                                                    >
                                                        Login
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        className="link"
                                                        to="/about"
                                                    >
                                                        About
                                                    </Link>
                                                </div>
                                                <div>
                                                    <a
                                                        className="link"
                                                        href="mailto:foo@gmail.com"
                                                    >
                                                        Contact Us
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Subscribe</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>
                                            Don’t miss to subscribe to our new
                                            feeds, fill the form below.
                                        </p>
                                    </div>
                                    <div className="subscribe-form mt-4">
                                        <form action="#">
                                            <input
                                                type="text"
                                                placeholder="Email Address"
                                            />
                                            <button className="shiny">
                                                <i className="fab fa-telegram-plane"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-area">
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                                <div className="copyright-text">
                                    <p>
                                        Welcome to E-Shops make with Love By
                                        Tal, Eden and Andrey ,Copyright {year}
                                    </p>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                                <div className="footer-menu">
                                    <ul>
                                        <li>
                                            <Link className="link" to="/">
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                className="link forbidden"
                                                href="#"
                                            >
                                                Terms
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="link forbidden"
                                                href="#"
                                            >
                                                Privacy
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="link forbidden"
                                                href="#"
                                            >
                                                Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="link forbidden"
                                                href="#"
                                            >
                                                Contact
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
