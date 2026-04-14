import { useState } from 'react'
import Header from './components/Header'
import TabSelector from './components/TabSelector'
import CaesarPanel from './components/CaesarPanel'
import VigenerePanel from './components/VigenerePanel'
import Footer from './components/Footer'
import Toast from './components/Toast'

function App() {
  const [activeTab, setActiveTab] = useState('caesar')
  const [theme, setTheme] = useState('dark')
  const [toast, setToast] = useState({ visible: false, message: '' })

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const showToast = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: '' }), 2000)
  }

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      
      <main className="main-content">
        <div className="container">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="fade-in" key={activeTab}>
            {activeTab === 'caesar' ? (
              <CaesarPanel showToast={showToast} />
            ) : (
              <VigenerePanel showToast={showToast} />
            )}
          </div>
        </div>
      </main>

      <Footer />
      <Toast visible={toast.visible} message={toast.message} />
    </>
  )
}

export default App
