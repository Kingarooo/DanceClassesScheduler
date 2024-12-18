import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import './style.css';
import axios from 'axios';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../components/Toast";
import { UserContext } from "/src/contexts/UserContext";

const QuestionsPage = () => {
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [forgivenessModal, setForgivenessModal] = useState(false);
    const navigate = useNavigate();
    const { user, login } = useContext(UserContext);

    const deleteAccount = async () => {
        try {
            const response = await axios.delete(`${process.env.API_BASE_URL}/registration/delete/${user.id}`);
            setConfirmationModal(false);
            if (response.status === 200) {
                showToast('Account deleted successfully');
                login(null);
                navigate('/');
            } else {
                showToast('An error occurred. Please try again.');
            }
        } catch (error) {
            showToast('An error occurred. Please try again.');
            console.error("Delete account error:", error);
        }
    };

    return (
        <div className="qEa-page">
            <Header />
            <div className="qEa-buttons">
                <h1>Settings</h1>
                <button onClick={() => setForgivenessModal(true)}>Change Password</button>
                <button onClick={() => setConfirmationModal(true)}>Delete Account</button>
            </div>
            {confirmationModal &&
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h1>Are you sure you want to delete your account?</h1>
                        <button onClick={deleteAccount}>Yes</button>
                        <button onClick={() => setConfirmationModal(false)}>No</button>
                    </div>
                </div>
            }
            {forgivenessModal &&
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h1>We appologize, but to accomplish this action you should contact the admin/teacher.</h1>
                        <h1>Email: example@gmail.com</h1>
                        <button onClick={() => setForgivenessModal(false)}>Close</button>
                    </div>
                </div>
            }
            <Footer />
        </div>
    );
};

export default QuestionsPage;
