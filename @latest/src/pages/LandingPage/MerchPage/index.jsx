import React from "react";
import './style.css';
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const Merch = () => {
    return (
        <div className="merch-page">
            <Header />
            <h1>Merch</h1>
            <div className="merch-container">
                <div className="merch-item">
                    <img src="/src/assets/merch/merch1.jpg" alt="merch1" />
                    <h3>Merch 1</h3>
                    <p>$20.00</p>
                    <button>Buy Now</button>
                </div>
                <div className="merch-item">
                    <img src="/src/assets/merch/merch2.jpg" alt="merch2" />
                    <h3>Merch 2</h3>
                    <p>$20.00</p>
                    <button>Buy Now</button>
                </div>
                <div className="merch-item">
                    <img src="/src/assets/merch/merch3.jpg" alt="merch3" />
                    <h3>Merch 3</h3>
                    <p>$20.00</p>
                    <button>Buy Now</button>
                </div>
                <div className="merch-item">
                    <img src="/src/assets/merch/merch4.jpg" alt="merch4" />
                    <h3>Merch 4</h3>
                    <p>$20.00</p>
                    <button>Buy Now</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Merch;   