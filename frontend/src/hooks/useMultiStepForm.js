import { useState, useEffect } from 'react';
import { submitFinalStep, fetchTimeSlots, fetchLocations } from '../services/api';

const useMultiStepForms = () => {
  const [step, setStep] = useState(1); // Step control (1, 2, 3)
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    selected_day: '',
    time_slots: [],
    location: '',
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [timeSlotsResponse, locationsResponse] = await Promise.all([
          fetchTimeSlots(),
          fetchLocations(),
        ]);
        if (timeSlotsResponse && Array.isArray(timeSlotsResponse.data)) {
          // No need to set time_slots to empty array if already empty
          if (timeSlotsResponse.data.length === 0) {
            console.warn('No available time slots returned from backend.');
          }
        } else {
          console.warn('Invalid time slots data received:', timeSlotsResponse);
        }
        if (locationsResponse && Array.isArray(locationsResponse.data)) {
          if (locationsResponse.data.length === 0) {
            console.warn('No locations returned from backend.');
          }
        } else {
          console.warn('Invalid locations data received:', locationsResponse);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Move to the next step
  const nextStep = async () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Update form data when fields change
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Save form data for each step to the session (for example)
  const saveData = async () => {
    try {
      const response = await submitFinalStep(formData);
      console.log('Data successfully saved to backend');
      // display the saved data
      console.log('Saved Data:', formData);
      // Return the reservation ID for the component to handle the success message
      return response.data.reservation_id;
    } catch (error) {
      console.error('Error saving data to backend:', error);
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error('Failed to save reservation. Please try again.');
      }
    }
  };

  return {
    step,
    formData,
    nextStep,
    prevStep,
    handleInputChange,
    saveData,
  };
};

export default useMultiStepForms;
