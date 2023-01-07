import Navbar from '../Navbar';
import Footer from '../Footer';
import '../../css/about.css';

function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="container pt-4 pb-4 main">
                <h1 className="text-primary">This is about page</h1>
            </div>

            <Footer />
        </>
    );
}

export default AboutUs;
