import React, { useState, useEffect, useRef } from 'react';
import enLogo from '../../../assets/images/uk.png'; // Adjust the path as necessary
import arLogo from '../../../assets/images/sa.png'; // Adjust the path as necessary
// import frLogo from '../../../assets/images/fr.png'; // Adjust the path as necessary
import './LanguageSelector.css';

const languages = [
  { code: 'en', name: 'EN', image: enLogo },
  // { code: 'ar', name: 'AR', image: arLogo },
  // { code: 'fr', name: 'FR', image: frLogo },
  // Add more languages 
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [open, setOpen] = useState(false); // Define the open state to control the dropdown visibility
  const ref = useRef(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setOpen(false);
    // Implement additional logic for application-wide language change
  };

  // Close dropdown when clicking outside
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

      {open && ( // Conditional rendering based on the 'open' state
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

