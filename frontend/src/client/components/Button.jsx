import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Button.css';

const Button = ({ 
  text,
  onClick,
  disabled = false,
  className = "",
  to
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (to) {
      navigate(to);
    }
  };

  return (
    <button 
      className={`start-button ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {text || t('button.startRequest')}
    </button>
  );
  
};

export default Button;
