/**
 * Checks if a value is an object and not null.
 * @param {any} obj - The value to check.
 * @return {boolean} True if the value is an object and not null, false otherwise.
 */
const isObject = (obj) => typeof obj === 'object' && obj !== null;

module.exports = { isObject };

