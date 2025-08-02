import React, { useEffect, useState } from "react";
import { fetchLocations } from "../../services/api";

const Step3LocationSelection = ({ formData, handleInputChange }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      setLoading(true);
      try {
        const response = await fetchLocations();
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]);
      }
      setLoading(false);
    };
    getLocations();
  }, []);

  return (
    <section className="form-step step3" aria-labelledby="step3-title">
      <h2 id="step3-title" className="form-step-title">
        Step 3: Location Selection
      </h2>

      <div className="form-group">
        <label htmlFor="locationPicker" className="form-label">
          Choose a location <span className="required">*</span>
        </label>
        <select
          id="locationPicker"
          className="form-select"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name} – {loc.address}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="info-text">Loading locations...</p>}
      {!loading && locations.length === 0 && (
        <p className="info-text">No locations available.</p>
      )}
    </section>
  );
};

export default Step3LocationSelection;
