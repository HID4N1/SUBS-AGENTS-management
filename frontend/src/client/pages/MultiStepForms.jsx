import React from "react";
import { useState } from 'react';
import axios from 'axios';

// hada khaso mochkilaaa
import { useMultiStepForm } from '../../hooks/useMultiStepForm';

// components
import Header from "../components/Header";
import Footer from "../components/Footer";

import Step1PersonalInfo from '../components/Step1PersonalInfo';
import Step2TimeSlot from '../components/Step2TimeSlot';
import Step3LocationSelection from '../components/Step3LocationSelection';

import NavigationButtons from '../components/NavigationButtons';
import ProgressIndicator from '../components/ProgressIndicator';


// styles
import '../styles/MultiStepForms.css';

const MultiStepForms = () => {
    
     return (
        
        <div className="MultiStepForms">
        <header>
            <Header />
        </header>
            <div className="multi-step-form">
                    {/* ghaykon hna l progress indicator */}


                <div className="form-container">
                    
                    <form>
                       
                    </form>


                    <div className="navigation-container">
                    <NavigationButtons 
                        onNext={() => console.log('Next clicked')}
                        onBack={() => console.log('Back clicked')}
                        nextDisabled={false}
                        backDisabled={false}
                    />
                </div>
                </div>
             

            </div>
        <footer>
            <Footer />
        </footer>
        
        
        </div>


    );
}
export default MultiStepForms;