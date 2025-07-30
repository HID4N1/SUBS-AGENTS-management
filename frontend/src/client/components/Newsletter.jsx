import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import "./../styles/Newsletter.css";

const Newsletter = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}, Email: ${email}`);
    alert(t('newsletter.subscribedAlert'));
  };

  return (
    <div className="newsletter-container">
      <h2>{t('newsletter.title')}</h2>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder={t('newsletter.placeholderName')} 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder={t('newsletter.placeholderEmail')} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">{t('newsletter.subscribeButton')}</button>
      </form>
    </div>
  );
};

export default Newsletter;


