import Navbar from '../Navbar';
import Footer from '../Footer';
import '../../css/about.css';

function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="container pt-4 pb-4 main">
                <h1 className="boldTitle text-center pt-3">
                    <span className="tapered2">About E-Shops</span>
                </h1>
                <h5 className=" text-center pt-3">
                    <span>
                        Everything you wanted to know about your fave fashion
                        brand. And then some.
                    </span>
                </h5>
                <div className="row images">
                    <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                        <img
                            className="aboutImg img-fluid"
                            src="/assets/images/who-we-are.png"
                            alt="Who we are"
                        />
                        <h4 className="text-center">Who we are</h4>
                        <p className="text-center ">
                            Your biggest fans, that's who
                        </p>
                    </div>
                    <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                        <img
                            className="aboutImg img-fluid"
                            src="/assets/images/brands.png"
                            alt="Brands"
                        />
                        <h4 className="text-center">The E-Shops Brands</h4>
                        <p className="text-center ">Made by us, loved by you</p>
                    </div>
                    <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
                        <img
                            className="aboutImg img-fluid"
                            src="/assets/images/experience.png"
                            alt="Experience"
                        />
                        <h4 className="text-center">The E-Shops experience</h4>
                        <p className="text-center ">
                            Cos there's so much more to us
                        </p>
                    </div>
                    <hr className="mt-5 mb-5" />
                </div>
            </div>

            <Footer />
        </>
    );
}

export default AboutUs;
