import React, { useState } from 'react';
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

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setOpen(false); // Close the dropdown after selecting a language
    // Additional logic to handle language change
  };

  return (
    <div className="language-selector">
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

