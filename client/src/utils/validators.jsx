// utils/validators.js

/**
 * Validates an email address.
 * @param {string} email The email address to validate.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
export const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  
  /**
   * Validates a password based on defined criteria.
   * @param {string} password The password to validate.
   * @returns {boolean} True if the password meets the criteria, otherwise false.
   */
  
  export const validatePassword = (password) => {
    // Criteria: At least 8 characters in length, at least one letter and one number. 
    // This pattern now allows special characters and spaces.
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/;
    console.log(password, regex.test(password));
    return regex.test(password);
};

  /**
   * Validates a username.
   * This is an example function. Replace or expand the criteria based on your requirements.
   * @param {string} username The username to validate.
   * @returns {boolean} True if the username is valid, otherwise false.
   */
  export const validateUsername = (username) => {
    // Example criteria: 4 to 20 characters, alphanumeric and underscores allowed
    const regex = /^[a-zA-Z0-9_]{4,20}$/;
    return regex.test(username);
  };
  
  /**
   * Add more validators as needed for application...
   */
  