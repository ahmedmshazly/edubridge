import React, { useState, useEffect, useRef } from 'react';
import enLogo from '../../../assets/images/uk.png'; 
import arLogo from '../../../assets/images/sa.png'; 
import './LanguageSelector.css';

const languages = [
  { code: 'en', name: 'EN', image: enLogo },
  // { code: 'ar', name: 'AR', image: arLogo },
  // { code: 'fr', name: 'FR', image: frLogo },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [open, setOpen] = useState(false); 
  const ref = useRef(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setOpen(false);
    
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);


  return (
    <div className="language-selector" ref={ref}>
      <div className="selected-language" onClick={() => setOpen(!open)}>
        <img src={selectedLanguage.image} alt={selectedLanguage.name} width={20} />
        {selectedLanguage.name}
      </div>

      {open && ( 
        <div className="options">
          {languages.map((language) => (
            <div key={language.code} className="option" onClick={() => handleLanguageChange(language)}>
              <img src={language.image} alt={language.name} width={20} />
              {language.name}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

