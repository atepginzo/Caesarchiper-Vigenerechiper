/**
 * Caesar Cipher utility functions
 */

/**
 * Encrypt plaintext using Caesar cipher
 * @param {string} text - The plaintext to encrypt
 * @param {number} shift - The shift value (0-25)
 * @returns {string} The encrypted ciphertext
 */
export function caesarEncrypt(text, shift) {
  return text
    .split('')
    .map(char => shiftChar(char, shift))
    .join('');
}

/**
 * Decrypt ciphertext using Caesar cipher
 * @param {string} text - The ciphertext to decrypt
 * @param {number} shift - The shift value (0-25)
 * @returns {string} The decrypted plaintext
 */
export function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - (shift % 26));
}

/**
 * Shift a single character by the given amount
 */
function shiftChar(char, shift) {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
  }
  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + shift) % 26) + 97);
  }
  return char;
}

/**
 * Brute-force all 25 possible shifts
 * @param {string} text - The ciphertext to brute-force
 * @returns {Array} Array of {shift, result, score} objects
 */
export function caesarBruteForce(text) {
  const results = [];
  for (let shift = 1; shift <= 25; shift++) {
    const result = caesarDecrypt(text, shift);
    const score = scorePlausibility(result);
    results.push({ shift, result, score });
  }
  return results;
}

/**
 * Get step-by-step breakdown of Caesar encryption
 */
export function getCaesarSteps(text, shift, mode = 'encrypt') {
  const steps = [];
  const effectiveShift = mode === 'decrypt' ? 26 - (shift % 26) : shift;
  
  text.split('').forEach((char, index) => {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;
    
    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const original = code - base;
      const shifted = (original + effectiveShift) % 26;
      const resultChar = String.fromCharCode(shifted + base);
      
      steps.push({
        position: index + 1,
        original: char.toUpperCase(),
        originalValue: original,
        shift: shift,
        formula: mode === 'encrypt' 
          ? `(${original} + ${shift}) mod 26 = ${shifted}`
          : `(${original} - ${shift} + 26) mod 26 = ${shifted}`,
        resultValue: shifted,
        result: resultChar.toUpperCase()
      });
    }
  });
  
  return steps;
}

/**
 * Score text plausibility using English letter frequency
 */
function scorePlausibility(text) {
  const freq = {
    'E': 12.7, 'T': 9.1, 'A': 8.2, 'O': 7.5, 'I': 7.0,
    'N': 6.7, 'S': 6.3, 'H': 6.1, 'R': 6.0, 'D': 4.3,
    'L': 4.0, 'C': 2.8, 'U': 2.8, 'M': 2.4, 'W': 2.4,
    'F': 2.2, 'G': 2.0, 'Y': 2.0, 'P': 1.9, 'B': 1.5,
    'V': 1.0, 'K': 0.8, 'J': 0.2, 'X': 0.2, 'Q': 0.1, 'Z': 0.1
  };
  
  const upper = text.toUpperCase();
  let score = 0;
  let letterCount = 0;
  
  for (const char of upper) {
    if (freq[char] !== undefined) {
      score += freq[char];
      letterCount++;
    }
  }
  
  return letterCount > 0 ? score / letterCount : 0;
}
