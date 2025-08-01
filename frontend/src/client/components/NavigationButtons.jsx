import React from 'react';
import '../styles/NavigationButton.css';

const NavigationButtons = ({ 
  step,
  onNext, 
  onBack, 
  nextDisabled = false, 
  backDisabled = false,

  nextText = "Next",
  backText = "Back"
}) => {

  
  const handleNext = () => {
    console.log('Next button clicked');
    if (onNext) {
      onNext();
    }
  };


  const handleBack = () => {
    console.log('Back button clicked');
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="navigation-buttons">

        {/* back Button */}
      { step > 1 && (
      <button 
        className="nav-button back-button"
        onClick={handleBack}
        disabled={backDisabled}
      >
        {backText}
      </button>
      )}

      
      {/* next Button */}
      <button 
        className="nav-button next-button"
        onClick={handleNext}
      >
        {nextText}
      </button>

    </div>
  );
};

export default NavigationButtons;