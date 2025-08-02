import React from "react";

const Step1PersonalInfo = ({ formData, handleInputChange }) => {


  return (
    <section className="form-step step1" aria-labelledby="step1-title">
      <h2 id="step1-title" className="form-step-title">
        Step 1: Personal Information
      </h2>

      <div className="form-group">
        <label htmlFor="client_name" className="form-label">
          Full Name <span className="required">*</span>
        </label>
        <input
          id="client_name"
          name="client_name"
          type="text"
          className="form-input"
          placeholder="Enter your full name"
          value={formData.client_name}
          onChange={(e) => handleInputChange("client_name", e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="client_phone" className="form-label">
          Phone Number <span className="required">*</span>
        </label>
        <input
          id="client_phone"
          name="client_phone"
          type="tel"
          className="form-input"
          placeholder="Enter your phone number"
          value={formData.client_phone}
          onChange={(e) => handleInputChange("client_phone", e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="client_email" className="form-label">
          Email Address <span className="required">*</span>
        </label>
        <input
          id="client_email"
          name="client_email"
          type="email"
          className="form-input"
          placeholder="Enter your email"
          value={formData.client_email}
          onChange={(e) => handleInputChange("client_email", e.target.value)}
          required
        />
      </div>
    </section>
  );
};

export default Step1PersonalInfo;
