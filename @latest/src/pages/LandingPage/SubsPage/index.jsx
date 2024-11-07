import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SubsNavbar from '/src/components/SubsNavbar';
import { UserContext } from '/src/contexts/UserContext';
import './style.css';

const SubsPage = () => {
    const { user } = useContext(UserContext);
    const isAdmin = user?.admin || false;
    const navigate = useNavigate();

    // Function to navigate to ClassesPage with a style parameter
    const handleButtonClick = (style) => {
        // Navigates to /classes with the style query parameter
        navigate(`/classes?style=${style}`);
    };

    return (
        <div className="subsPage">
            <Header />
            <div className="content">
                {isAdmin && <SubsNavbar />}
                <div className="subs-container">
                    <h1>Subscription Options</h1>
                    <div className="subscription-options">
                        {[
                            { title: "Hip-Hop: $29.99/month", description: "3x per week, you choose!", buttonText: "Let's Dance!", style: "HipHop" },
                            { title: "Yoga: $20.00/month", description: "2x per week, Monday and Thursday.", buttonText: "Let's Ahmmm", style: "Yoga" },
                            { title: "Full plan: $50/month", description: "Free to come to any class, it's your home too.", buttonText: "Become one of us!", style: "" }
                        ].map((option, index) => (
                            <div key={index} className="option-card">
                                <div className="card-content">
                                    <h2>{option.title}</h2>
                                    <p>{option.description}</p>
                                </div>
                                <button onClick={() => handleButtonClick(option.style)}>{option.buttonText}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SubsPage;
