// src/components/common/Header.js
import React from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <LanguageSelector />
    </header>
  );
};

export default Header;
