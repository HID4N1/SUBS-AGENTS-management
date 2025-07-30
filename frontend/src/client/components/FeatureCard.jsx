import React from 'react';
import '../styles/FeatureCard.css';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;


