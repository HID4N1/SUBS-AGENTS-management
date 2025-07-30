import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/HowItWorks.css'; 

// images
import stepImage1 from '../../assets/images/step1.jpeg';
import stepImage2 from '../../assets/images/step2.jpeg';
import stepImage3 from '../../assets/images/step3.jpeg'; 


const HowItWorks = () => {
    const { t } = useTranslation();

    return (
        <section className="howitworks-section">
            <div className="container">
                <div className="text-center max-width-2xl">
                    <h2 className="title">{t('howItWorks.title')}</h2>
                    <p className="subtitle">
                      {t('howItWorks.subtitle')}
                    </p>
                </div>

                <div className="steps-wrapper">
                    <div className="curved-line-wrapper">
                        <img className="curved-line" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                    </div>

                    <div className="steps-grid">
                        <div className="step">
                            <div className="step-image">
                                <img src={stepImage1} alt="Step image 1" />
                            </div>
                            <p className="step-description">{t('howItWorks.step1')}</p>
                        </div>

                        <div className="step">
                            <div className="step-image">
                                <img src={stepImage2} alt="Step image 2" />
                            </div>
                            <p className="step-description">{t('howItWorks.step2')}</p>
                        </div>

                        <div className="step">
                            <div className="step-image">
                                <img src={stepImage3} alt="Step image 3" />
                            </div>
                            <p className="step-description">{t('howItWorks.step3')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
