import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css'; 

const Footer = () => {
  const { t} = useTranslation();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="copyright">© {new Date().getFullYear()} {t('footer.allRightsReserved')}</p>
        <div className="footer-links">
          <a href="#" className="footer-link">{t('footer.privacyPolicy')}</a>
          <span className="link-separator">|</span>
          <a href="#" className="footer-link">{t('footer.termsOfService')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

