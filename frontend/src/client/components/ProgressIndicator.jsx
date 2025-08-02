import React from "react";
import "../styles/ProgressIndicator.css";

const ProgressIndicator = ({ step, totalSteps, onStepClick }) => {
  return (
    <div className="progress-indicator" aria-label={`Step ${step} of ${totalSteps}`}>
      {/* Progress Bar Track & Fill */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Steps */}
      <div className="progress-steps" role="list">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          const active = stepNumber <= step;
          const current = stepNumber === step;

          return (
            <button
              key={index}
              role="listitem"
              aria-current={current ? "step" : undefined}
              className={`step ${active ? "active" : ""} ${current ? "current" : ""}`}
              onClick={() => onStepClick && onStepClick(stepNumber)}
              disabled={!onStepClick}
            >
              <span className="step-number">{stepNumber}</span>
              <span className="sr-only">{`Step ${stepNumber}`}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
