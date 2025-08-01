import React from "react";
import { FaShieldAlt, FaClock, FaHeadset } from 'react-icons/fa';

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import HowItWorks from "../components/HowItWorks";
import FeatureCard from "../components/FeatureCard";
import Newsletter from "../components/Newsletter";

// styles
import '../styles/LandingPage.css'; 
// images
import heroImage from '../../assets/images/Carte_Abbonement.jpg'; // Adjust the path as necessary


import { useTranslation } from 'react-i18next';

const LandingPage = () => {
    const { t } = useTranslation();

    return (
    <div className="landing-page">
        <header>
            <Header />
        </header>

        <div className="content">

            <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">{t('landingPage.heroTitle')} <span className="highlight">{t('landingPage.heroHighlight')}</span></h1>
                        <p className="hero-description">{t('landingPage.heroDescription')}</p>
                       <Button 
                        onClick={() => console.log('Button clicked')}
                        className="hero-button"
                        to="/form/Forms" // Assuming you want to navigate to the first step of the form
                        />
                    </div>
                    <div className="hero-image-container">
                        <img src={heroImage} alt="Subscription Card" className="hero-image" />
                    </div>
            </section>

            {/* How it works section */}
            <div className="Section-1">
                <HowItWorks />
            </div>

            {/* Features Section */}
            <div className="feature-section">
                    <h2>{t('landingPage.featureTitle')}</h2>
                    <p>{t('landingPage.featureDescription')}</p>
                    
                    <div className="feature-cards-container">
                        <FeatureCard 
                        icon={<FaShieldAlt />} 
                        title={t('landingPage.featureCard1Title')} 
                        description={t('landingPage.featureCard1Description')} 
                        />
                        <FeatureCard 
                        icon={<FaClock />} 
                        title={t('landingPage.featureCard2Title')} 
                        description={t('landingPage.featureCard2Description')} 
                        />
                        <FeatureCard 
                        icon={<FaHeadset />} 
                        title={t('landingPage.featureCard3Title')} 
                        description={t('landingPage.featureCard3Description')} 
                        />
                    </div>
            </div>

            {/* Newsletter Section */}
            <div className="NewsLetter">
                <Newsletter />
            </div>
        </div>


        <footer>
            <Footer />
        </footer>
    </div>
    );
    }

export default LandingPage;
