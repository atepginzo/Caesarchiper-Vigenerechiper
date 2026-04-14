import { useState, useCallback, useMemo } from 'react'
import { vigenereEncrypt, vigenereDecrypt, expandKey, getVigenereSteps } from '../utils/vigenereCipher'
import VigenereSquare from './VigenereSquare'
import ResultBox from './ResultBox'
import StepTable from './StepTable'

const MAX_CHARS = 5000

export default function VigenerePanel({ showToast }) {
  const [input, setInput] = useState('')
  const [key, setKey] = useState('')
  const [result, setResult] = useState('')
  const [steps, setSteps] = useState([])
  const [copied, setCopied] = useState(false)
  const [lastMode, setLastMode] = useState(null)
  const [activeStepIndex, setActiveStepIndex] = useState(-1)

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= MAX_CHARS) setInput(value)
  }

  const handleKeyChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase()
    setKey(value)
  }

  const handleEncrypt = useCallback(() => {
    if (!input.trim() || !key.trim()) return
    const encrypted = vigenereEncrypt(input, key)
    setResult(encrypted)
    setSteps(getVigenereSteps(input, key, 'encrypt'))
    setLastMode('encrypt')
    setActiveStepIndex(-1)
  }, [input, key])

  const handleDecrypt = useCallback(() => {
    if (!input.trim() || !key.trim()) return
    const decrypted = vigenereDecrypt(input, key)
    setResult(decrypted)
    setSteps(getVigenereSteps(input, key, 'decrypt'))
    setLastMode('decrypt')
    setActiveStepIndex(-1)
  }, [input, key])

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      showToast('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      showToast('Failed to copy')
    }
  }

  const handleUseAsInput = () => {
    if (!result) return
    setInput(result)
    setResult('')
    setSteps([])
  }

  const handleClear = () => {
    setInput('')
    setResult('')
    setSteps([])
    setKey('')
    setLastMode(null)
    setActiveStepIndex(-1)
  }

  const keyExpansion = useMemo(() => {
    if (!input || !key) return []
    return expandKey(input, key)
  }, [input, key])

  // Get highlight positions for the Vigenere Square
  const highlightRow = useMemo(() => {
    if (steps.length === 0) return -1
    // Highlight the last step's key row
    const idx = activeStepIndex >= 0 ? activeStepIndex : steps.length - 1
    if (idx >= 0 && idx < steps.length) {
      return steps[idx].keyValue
    }
    return -1
  }, [steps, activeStepIndex])

  const highlightCol = useMemo(() => {
    if (steps.length === 0) return -1
    const idx = activeStepIndex >= 0 ? activeStepIndex : steps.length - 1
    if (idx >= 0 && idx < steps.length) {
      return steps[idx].originalValue
    }
    return -1
  }, [steps, activeStepIndex])

  return (
    <>
      <div className="cipher-layout">
        {/* Left: Controls */}
        <div className="glass-card panel glass-card--glow">
          <p className="panel__title">Control Panel</p>

          {/* Input */}
          <div className="input-group">
            <div className="input-group__label">
              <span className="input-group__label-text">Input Text</span>
              <span className="input-group__label-hint">{input.length}/{MAX_CHARS}</span>
            </div>
            <textarea
              className="input-group__textarea"
              placeholder="Enter plaintext to encrypt, or ciphertext to decrypt..."
              value={input}
              onChange={handleInputChange}
              maxLength={MAX_CHARS}
              id="vigenere-input"
            />
          </div>

          {/* Key */}
          <div className="input-group">
            <div className="input-group__label">
              <span className="input-group__label-text">Encryption Key</span>
              <span className="input-group__label-hint">Length: {key.length}</span>
            </div>
            <input
              type="text"
              className="input-group__input"
              placeholder="Enter key (letters only)..."
              value={key}
              onChange={handleKeyChange}
              id="vigenere-key"
            />
            <div className="input-group__info">
              <span>Use the same key for decryption. Auto-uppercase.</span>
            </div>
          </div>

          {/* Key expansion visualization */}
          {keyExpansion.length > 0 && (
            <div className="input-group">
              <div className="input-group__label">
                <span className="input-group__label-text">Key Expansion</span>
              </div>
              <div className="key-expansion">
                {keyExpansion.map((pair, i) => (
                  <div key={i} className="key-expansion__pair">
                    <span className={`key-expansion__text-char ${!pair.isLetter ? 'key-expansion__non-letter' : ''}`}>
                      {pair.textChar}
                    </span>
                    <span className={`key-expansion__key-char ${!pair.isLetter ? 'key-expansion__non-letter' : ''}`}>
                      {pair.keyChar}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="actions">
            <button className="btn btn--primary" onClick={handleEncrypt} id="btn-encrypt-vigenere">
              Encrypt
            </button>
            <button className="btn btn--secondary" onClick={handleDecrypt} id="btn-decrypt-vigenere">
              To Plaintext (Decrypt)
            </button>
          </div>

          {/* Result */}
          <ResultBox
            result={result}
            onCopy={handleCopy}
            onUseAsInput={handleUseAsInput}
            onClear={handleClear}
            copied={copied}
          />
        </div>

        {/* Right: Visualization */}
        <div className="glass-card panel glass-card--glow">
          <VigenereSquare
            highlightRow={highlightRow}
            highlightCol={highlightCol}
          />
        </div>
      </div>

      {/* Step table (full width below) */}
      {steps.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <StepTable steps={steps} mode={lastMode} cipherType="vigenere" />
        </div>
      )}
    </>
  )
}
