/**
 * Vigenere Cipher utility functions
 */

/**
 * Encrypt plaintext using Vigenere cipher
 * @param {string} text - The plaintext to encrypt
 * @param {string} key - The encryption key
 * @returns {string} The encrypted ciphertext
 */
export function vigenereEncrypt(text, key) {
  if (!key) return text;
  const upperKey = key.toUpperCase();
  let keyIndex = 0;
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;
    
    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 65;
      const result = String.fromCharCode(((code - base + shift) % 26) + base);
      keyIndex++;
      return result;
    }
    return char;
  }).join('');
}

/**
 * Decrypt ciphertext using Vigenere cipher
 * @param {string} text - The ciphertext to decrypt
 * @param {string} key - The encryption key
 * @returns {string} The decrypted plaintext
 */
export function vigenereDecrypt(text, key) {
  if (!key) return text;
  const upperKey = key.toUpperCase();
  let keyIndex = 0;
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;
    
    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const shift = upperKey.charCodeAt(keyIndex % upperKey.length) - 65;
      const result = String.fromCharCode(((code - base - shift + 26) % 26) + base);
      keyIndex++;
      return result;
    }
    return char;
  }).join('');
}

/**
 * Expand key to match text length (for visualization)
 * @param {string} text - The text
 * @param {string} key - The key to expand
 * @returns {Array} Array of {textChar, keyChar, isLetter} objects
 */
export function expandKey(text, key) {
  if (!key) return [];
  const upperKey = key.toUpperCase();
  let keyIndex = 0;
  
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    
    if (isLetter) {
      const keyChar = upperKey[keyIndex % upperKey.length];
      keyIndex++;
      return { textChar: char.toUpperCase(), keyChar, isLetter: true };
    }
    return { textChar: char, keyChar: '-', isLetter: false };
  });
}

/**
 * Get step-by-step breakdown of Vigenere encryption
 */
export function getVigenereSteps(text, key, mode = 'encrypt') {
  if (!key) return [];
  const upperKey = key.toUpperCase();
  const steps = [];
  let keyIndex = 0;
  
  text.split('').forEach((char, index) => {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;
    
    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const p = code - base;
      const keyChar = upperKey[keyIndex % upperKey.length];
      const k = keyChar.charCodeAt(0) - 65;
      
      let resultValue, formula;
      if (mode === 'encrypt') {
        resultValue = (p + k) % 26;
        formula = `(${p} + ${k}) mod 26 = ${resultValue}`;
      } else {
        resultValue = (p - k + 26) % 26;
        formula = `(${p} - ${k} + 26) mod 26 = ${resultValue}`;
      }
      
      const resultChar = String.fromCharCode(resultValue + 65);
      
      steps.push({
        position: index + 1,
        original: char.toUpperCase(),
        originalValue: p,
        keyChar,
        keyValue: k,
        formula,
        resultValue,
        result: resultChar
      });
      
      keyIndex++;
    }
  });
  
  return steps;
}
