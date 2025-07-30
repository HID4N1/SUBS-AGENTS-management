import React from 'react';
import LangSelect from '../../components/LangSelector';
import logo from '../../assets/images/Logo_Casa_Tram-Bus.png';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
          <div className="header-left">
              <div className="logo-main">
                <img src={logo} alt="Logo" />
              </div>
          </div>
          <div className="header-right">
            <LangSelect />
          </div>
      </div>
    </header>
  );
};

export default Header;
