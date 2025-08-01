import React from "react";
import '../styles/ProgressIndicator.css';

const ProgressIndicator = ({ step }) => {
    return (
        <div className="progress-indicator">
            <div className="step active">{`Step ${step}`}</div>
        </div>
    );
};
export default ProgressIndicator;
