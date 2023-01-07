import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Pnf() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <Navbar />
            <div className="container main">
                <div className="pnf">
                    <img
                        className="img-fluid"
                        src="../404.png"
                        alt="Page Not Found"
                    />
                </div>
                <div className="msg text-center">
                    <h2 className="fw-bold">Whoops!</h2>
                    <h5>The page you're looking for isn't found :(</h5>
                </div>

                <div className="backBtn text-center mt-4 mb-4">
                    <button className="btn btn-dark mx-auto" onClick={goBack}>
                        <i className="fa-solid fa-arrow-left"></i> Go Back
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Pnf;
