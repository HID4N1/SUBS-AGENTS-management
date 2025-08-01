import React, { useEffect, useState } from "react";
import "../styles/alert.css";

const Alert = ({ type = "info", message, onClose, autoClose = true, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      if (autoClose) {
        const timer = setTimeout(() => handleClose(), duration);
        return () => clearTimeout(timer);
      }
    }
  }, [message, autoClose, duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(), 300); // wait for animation before removing
  };

  return (
    <div className={`alert-container ${visible ? "show" : "hide"} ${type}`}>
      <span>{message}</span>
      <button onClick={handleClose}>&times;</button>
    </div>
  );
};

export default Alert;
