import react from 'react';
import NavigationButtons from './NavigationButtons';

const Step1PersonalInfo = ({ formData, handleInputChange}) => {
    return (
        <div>
          <h2>Step 1: Personal Information</h2>
          
          {/* input dyal name */}
          <input
            type="text"
            placeholder="Full Name"
            value={formData.client_name}
            onChange={(e) => handleInputChange('client_name', e.target.value)}
          />

          {/* input dyal l phone */}
          <input
            type="text"
            placeholder="Phone"
            value={formData.client_phone}
            onChange={(e) => handleInputChange('client_phone', e.target.value)}
          />

          {/* input dyal l mail */}
          <input
            type="email"
            placeholder="Email"
            value={formData.client_email}
            onChange={(e) => handleInputChange('client_email', e.target.value)}
          />

        </div>


      );
    };
export default Step1PersonalInfo;
