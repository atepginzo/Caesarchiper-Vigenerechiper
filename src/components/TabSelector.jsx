export default function TabSelector({ activeTab, onTabChange }) {
  return (
    <nav className="tab-nav" role="tablist" aria-label="Cipher type selection">
      <button
        className={`tab-nav__btn ${activeTab === 'caesar' ? 'tab-nav__btn--active' : ''}`}
        onClick={() => onTabChange('caesar')}
        role="tab"
        aria-selected={activeTab === 'caesar'}
        id="tab-caesar"
      >
        Caesar Cipher
      </button>
      <button
        className={`tab-nav__btn ${activeTab === 'vigenere' ? 'tab-nav__btn--active' : ''}`}
        onClick={() => onTabChange('vigenere')}
        role="tab"
        aria-selected={activeTab === 'vigenere'}
        id="tab-vigenere"
      >
        Vigenere Cipher
      </button>
    </nav>
  )
}
