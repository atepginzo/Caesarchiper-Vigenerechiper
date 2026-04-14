import { useState, useCallback } from 'react'
import { caesarEncrypt, caesarDecrypt, caesarBruteForce, getCaesarSteps } from '../utils/caesarCipher'
import CaesarWheel from './CaesarWheel'
import ResultBox from './ResultBox'
import StepTable from './StepTable'
import BruteForceResults from './BruteForceResults'

const MAX_CHARS = 5000
const ROT_VALUES = [1, 3, 7, 13]

export default function CaesarPanel({ showToast }) {
  const [input, setInput] = useState('')
  const [shift, setShift] = useState(3)
  const [result, setResult] = useState('')
  const [steps, setSteps] = useState([])
  const [bruteResults, setBruteResults] = useState(null)
  const [copied, setCopied] = useState(false)
  const [lastMode, setLastMode] = useState(null)

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= MAX_CHARS) {
      setInput(value)
    }
  }

  const handleEncrypt = useCallback(() => {
    if (!input.trim()) return
    const encrypted = caesarEncrypt(input, shift)
    setResult(encrypted)
    setSteps(getCaesarSteps(input, shift, 'encrypt'))
    setBruteResults(null)
    setLastMode('encrypt')
  }, [input, shift])

  const handleDecrypt = useCallback(() => {
    if (!input.trim()) return
    const decrypted = caesarDecrypt(input, shift)
    setResult(decrypted)
    setSteps(getCaesarSteps(input, shift, 'decrypt'))
    setBruteResults(null)
    setLastMode('decrypt')
  }, [input, shift])

  const handleBruteForce = useCallback(() => {
    if (!input.trim()) return
    const results = caesarBruteForce(input)
    setBruteResults(results)
    setResult('')
    setSteps([])
    setLastMode('brute')
  }, [input])

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
    setBruteResults(null)
  }

  const handleClear = () => {
    setInput('')
    setResult('')
    setSteps([])
    setBruteResults(null)
    setLastMode(null)
  }

  const handleSelectShift = (selectedShift) => {
    setShift(selectedShift)
    const decrypted = caesarDecrypt(input, selectedShift)
    setResult(decrypted)
    setSteps(getCaesarSteps(input, selectedShift, 'decrypt'))
    setBruteResults(null)
    setLastMode('decrypt')
  }

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
              id="caesar-input"
            />
          </div>

          {/* Shift slider */}
          <div className="shift-control">
            <div className="shift-control__header">
              <span className="shift-control__label">Shift Value</span>
              <span className="shift-control__value">{shift}</span>
            </div>
            <input
              type="range"
              className="shift-control__slider"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
              id="caesar-shift-slider"
            />
            <div className="rot-buttons">
              {ROT_VALUES.map(val => (
                <button
                  key={val}
                  className={`rot-btn ${shift === val ? 'rot-btn--active' : ''}`}
                  onClick={() => setShift(val)}
                  id={`rot-btn-${val}`}
                >
                  ROT-{val}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="btn btn--primary" onClick={handleEncrypt} id="btn-encrypt-caesar">
              Encrypt
            </button>
            <button className="btn btn--secondary" onClick={handleDecrypt} id="btn-decrypt-caesar">
              To Plaintext (Decrypt)
            </button>
            <button className="btn btn--accent" onClick={handleBruteForce} id="btn-bruteforce">
              Find Plaintext (Auto brute-force)
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
          <CaesarWheel shift={shift} />
        </div>
      </div>

      {/* Step table (full width below) */}
      {steps.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <StepTable steps={steps} mode={lastMode} cipherType="caesar" />
        </div>
      )}

      {/* Brute force results */}
      {bruteResults && (
        <div style={{ marginTop: '1.5rem' }}>
          <BruteForceResults results={bruteResults} onSelectShift={handleSelectShift} />
        </div>
      )}
    </>
  )
}
