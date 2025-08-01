import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useMultiStepForms from '../../hooks/useMultiStepForm';
import Step1 from '../components/Step1PersonalInfo';
import Step2 from '../components/Step2TimeSlot';
import Step3 from '../components/Step3LocationSelection';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavigationButtons from '../components/NavigationButtons';
import ProgressIndicator from "../components/ProgressIndicator";

// styles
import '../styles/MultiStepForms.css';

const MultiStepForms = () => {
    const {
        step,
        formData,
        nextStep,
        prevStep,
        handleInputChange,
        saveData,
      } = useMultiStepForms();

    const navigate = useNavigate();


    const handleNext = async () => {
      // Validation for each step
      if (step === 1) {
        if (!formData.client_name || !formData.client_phone || !formData.client_email) {
          alert('Please fill in all personal information fields.');
          return;
        }
      } else if (step === 2) {
        if (!formData.selected_day) {
          alert('Please select a day.');
          return;
        }
        if (!formData.time_slots || formData.time_slots.length === 0) {
          alert('Please select a time slot.');
          return;
        }
      } else if (step === 3) {
        if (!formData.location) {
          alert('Please select a location.');
          return;
        }
      }

      if (step === 3) {
        try {
          const reservationId = await saveData();
          navigate('/form/confirmation', { state: { reservationId } });
        } catch (error) {
          alert('Failed to save reservation. Please try again.');
        }
      } else {
        nextStep();
      }
    };



     return (
        
        <div className="MultiStepForms">
        <header>
            <Header />
        </header>
            <div className="multi-step-form">
                    {/* ghaykon hna l progress indicator */}
                    <ProgressIndicator step={step} />
                    
                    {/* ghaykon hna l form */}

                <div className="form-container">
                    
                    <form>
                         {step === 1 && (
                            <Step1
                            formData={formData}
                            handleInputChange={handleInputChange}
                            nextStep={nextStep}
                            />
                        )}
                        {step === 2 && (
                            <Step2
                            formData={formData}
                            handleInputChange={handleInputChange}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            />
                        )}
                        {step === 3 && (
                            <Step3
                            formData={formData}
                            handleInputChange={handleInputChange}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            saveData={saveData}
                            />
                        )}
                    </form>
                    <NavigationButtons
                        step={step}
                        onNext={handleNext}
                        onBack={prevStep}
                    />

                    <div className="navigation-container">
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
