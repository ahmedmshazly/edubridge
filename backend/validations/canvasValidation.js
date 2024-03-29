// Assume canvasTemplate.js exports a properly structured template object
const { canvasTemplate } = require('../templates/canvasTemplate');

function validateStructure(data, structure, path = '') {
    let results = {
        missing: [],
        extras: [],
        notes: [] // Notes for optional fields
    };

    // Handle the "*" for dynamic keys at any level
    const keysToCheck = structure['*'] ? Object.keys(data) : Object.keys(structure);
    
    keysToCheck.forEach(key => {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (structure['*'] || (structure[key] && typeof structure[key] === 'object')) {
            // Nested structure or dynamic key handling
            const subStructure = structure['*'] || structure[key];
            const subData = data[key];
            
            if (!subData && structure['*']) {
                // If the structure expects dynamic keys but the key is not present in data
                results.missing.push(currentPath);
            } else if (subData) {
                // Recursive validation for nested structures
                const subResults = validateStructure(subData, subStructure, currentPath);
                results.missing.push(...subResults.missing);
                results.extras.push(...subResults.extras);
                results.notes.push(...subResults.notes);
            }
        } else if (structure.required && structure.required.includes(key)) {
            // Check required fields
            if (data[key] === undefined) {
                results.missing.push(currentPath);
            }
        } else if (structure.optional && structure.optional.includes(key)) {
            // Note optional fields
            if (data[key] === undefined) {
                results.notes.push(`${currentPath} (optional)`);
            }
        } else if (!structure[key]) {
            // Extra fields not defined in the template
            results.extras.push(currentPath);
        }
    });

    // After handling all keys, check for any required fields in the structure not present in data
    if (structure.required) {
        structure.required.forEach(requiredKey => {
            if (!data.hasOwnProperty(requiredKey)) {
                results.missing.push(`${path}.${requiredKey}`);
            }
        });
    }

    return results;
}

function validateCanvasStructure(data) {
    // Directly call validateStructure with the canvas template for canvas data
    return validateStructure(data, canvasTemplate);
}

module.exports = { validateCanvasStructure };
