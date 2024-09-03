import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import Scheduler from '/src/components/Scheduler';
import './style.css';

const LessonPage = () => {
    return (
        <div className="lesson-page">
            <Header />
                <Scheduler props="null" />
            
            <Footer />
        </div>
    );
}

export default LessonPage;