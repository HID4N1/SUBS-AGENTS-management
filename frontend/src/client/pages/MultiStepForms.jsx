import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useMultiStepForms from "../../hooks/useMultiStepForm";
import Step1 from "../components/Step1PersonalInfo";
import Step2 from "../components/Step2TimeSlot";
import Step3 from "../components/Step3LocationSelection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationButtons from "../components/NavigationButtons";
import ProgressIndicator from "../components/ProgressIndicator";
import Alert from "../components/alert";

import "../styles/MultiStepForms.css";

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
  const [alert, setAlert] = useState({ message: "", type: "info", visible: false });

  const showAlert = (message, type = "info") =>
    setAlert({ message, type, visible: true });

  const handleCloseAlert = () =>
    setAlert((prev) => ({ ...prev, visible: false }));

  const validateStep = () => {
    if (step === 1) {
      if (!formData.client_name || !formData.client_phone || !formData.client_email) {
        showAlert("Please fill in all personal information fields.", "warning");
        return false;
      }
    } else if (step === 2) {
      if (!formData.selected_day) {
        showAlert("Please select a day.", "warning");
        return false;
      }
      if (!formData.time_slots || formData.time_slots.length === 0) {
        showAlert("Please select a time slot.", "warning");
        return false;
      }
    } else if (step === 3) {
      if (!formData.location) {
        showAlert("Please select a location.", "warning");
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step === 3) {
      try {
        const reservationId = await saveData();
        showAlert("Reservation successfully saved!", "success");
        // Small delay to allow user to see the success message
        setTimeout(() => {
          navigate("/form/confirmation", { state: { reservationId } });
        }, 2000);
      } catch (error) {
        showAlert(error.message || "Failed to save reservation. Please try again.", "error");
      }
    } else {
      nextStep();
    }
  };

  return (
    <div className="MultiStepForms">
      <Header />

      <main className="multi-step-form" aria-label="Multi step reservation form">
        {/* Progress indicator */}
        <ProgressIndicator step={step} totalSteps={3} />

        {/* Form container */}
        <div className="form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <Step1 formData={formData} handleInputChange={handleInputChange} />
            )}
            {step === 2 && (
              <Step2
                formData={formData}
                handleInputChange={handleInputChange}
                prevStep={prevStep}
              />
            )}
            {step === 3 && (
              <Step3
                formData={formData}
                handleInputChange={handleInputChange}
                prevStep={prevStep}
                saveData={saveData}
              />
            )}
          </form>

          <NavigationButtons step={step} onNext={handleNext} onBack={prevStep} />
        </div>
      </main>

      {alert.visible && (
        <Alert type={alert.type} message={alert.message} onClose={handleCloseAlert} />
      )}

      <Footer />
    </div>
  );
};

export default MultiStepForms;
