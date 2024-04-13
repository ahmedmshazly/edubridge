function logObjectStructure(obj, depth, indent = '') {
  if (depth < 1) return; // Stop recursion when depth reaches zero

  Object.entries(obj).forEach(([key, value]) => {
    // Log the key with its type
    console.log(`${indent}${key}: ${Array.isArray(value) ? 'Array' : typeof value}`);

    // If value is an object (not null, not an array), recurse with decreased depth
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      logObjectStructure(value, depth - 1, `${indent}  `); // Recurse with one less depth
    }
  });
}

  module.exports = {logObjectStructure}