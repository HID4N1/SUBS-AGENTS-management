import React from "react";
import "../styles/ProgressIndicator.css";

const ProgressIndicator = ({ step, totalSteps }) => {
  return (
    <div className="progress-indicator">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>

      <div className="progress-steps">
        {[...Array(totalSteps)].map((_, index) => {
          const active = index + 1 <= step;
          return (
            <div
              key={index}
              className={`step ${active ? "active" : ""}`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
