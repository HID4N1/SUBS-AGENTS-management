import React, { useEffect, useState } from "react";
import { fetchTimeSlots } from "../../services/api";

const Step2TimeSlot = ({ formData, handleInputChange }) => {
  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [uniqueDays, setUniqueDays] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all time slots on mount
  useEffect(() => {
    const fetchAllSlots = async () => {
      setLoading(true);
      try {
        const response = await fetchTimeSlots();
        setAllTimeSlots(response.data);

        // Extract unique days
        const daysSet = new Set(
          response.data.map((slot) =>
            new Date(slot.start_time).toISOString().split("T")[0]
          )
        );
        setUniqueDays(Array.from(daysSet));
      } catch (error) {
        console.error("Error fetching time slots:", error);
        setAllTimeSlots([]);
        setUniqueDays([]);
      }
      setLoading(false);
    };
    fetchAllSlots();
  }, []);

  // Filter time slots when selected_day changes
  useEffect(() => {
    if (formData.selected_day) {
      const filtered = allTimeSlots.filter(
        (slot) =>
          new Date(slot.start_time).toISOString().split("T")[0] ===
          formData.selected_day
      );
      setFilteredTimeSlots(filtered);
    } else {
      setFilteredTimeSlots([]);
    }
  }, [formData.selected_day, allTimeSlots]);

  const handleDayChange = (e) => {
    handleInputChange("selected_day", e.target.value);
    handleInputChange("time_slots", []); // reset selection
  };

  const handleRadioChange = (id) => {
    handleInputChange("time_slots", [id]);
  };

  return (
    <section className="form-step step2" aria-labelledby="step2-title">
      <h2 id="step2-title" className="form-step-title">
        Step 2: Time Slot Selection
      </h2>

      <div className="form-group">
        <label htmlFor="dayPicker" className="form-label">
          Select a day <span className="required">*</span>
        </label>
        <select
          id="dayPicker"
          className="form-select"
          value={formData.selected_day}
          onChange={handleDayChange}
        >
          <option value="">-- Select a day --</option>
          {uniqueDays.map((day) => (
            <option key={day} value={day}>
              {new Date(day).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="info-text">Loading time slots...</p>}
      {!loading && formData.selected_day && filteredTimeSlots.length === 0 && (
        <p className="info-text">No time slots available for the selected day.</p>
      )}
      {!loading && !formData.selected_day && (
        <p className="info-text">Please select a day to see available time slots.</p>
      )}

      {!loading && filteredTimeSlots.length > 0 && (
        <fieldset className="form-group time-slots">
          <legend className="form-label">Available Time Slots</legend>
          {filteredTimeSlots.map((slot) => (
            <label key={slot.id} className="radio-option">
              <input
                type="radio"
                name="timeSlot"
                value={slot.id}
                checked={formData.time_slots.includes(slot.id)}
                onChange={() => handleRadioChange(slot.id)}
              />
              <span>
                {new Date(slot.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(slot.end_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </label>
          ))}
        </fieldset>
      )}
    </section>
  );
};

export default Step2TimeSlot;
