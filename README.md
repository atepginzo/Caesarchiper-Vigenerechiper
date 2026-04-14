# CryptX — Interactive Cipher Studio

**CryptX** is a modern, interactive web application built with React and Vite for exploring and visualizing the **Caesar** and **Vigenère** ciphers. It features a sleek, cyberpunk-inspired UI, real-time visualization, and robust brute-force decryption capabilities.

## 🚀 Features

- **Caesar Cipher**:
  - Interactive Caesar Wheel visualization.
  - Manual Shift slider (0-25) and quick ROT (ROT-1, ROT-3, ROT-7, ROT-13) buttons.
  - One-click auto brute-force decryption using English letter frequency analysis.
- **Vigenère Cipher**:
  - Dynamic Vigenère Square (Tabula Recta) highlighting the active encryption/decryption matrix point.
  - Real-time key expansion visualization.
- **Step-by-Step Table**: Detailed breakdown showing character values, formula calculation, and text transformation for highly educational tracking.
- **Modern UI/UX**:
  - Clean, professional typography & glassmorphic containers.
  - Smooth Light/Dark mode toggle.
  - No emojis—strictly composed of sleek text and minimalist SVG icons.
- **Responsive Design**: Adapts beautifully to mobile, tablet, and desktop environments.

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: Pure Modern CSS (`index.css`) with Custom Layouts Flexbox/Grid
- **Icons**: Inline SVGs (Heroicons-inspired)
- **Deployment**: Configured for GitHub Pages (`gh-pages`)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atepginzo/Caesarchiper-Vigenerechiper.git
   cd Caesarchiper-Vigenerechiper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   > By default, the application will be available at `http://localhost:3000/`.

## 🌐 Deployment to GitHub Pages

This repository is pre-configured to automatically build and deploy to GitHub Pages!

To deploy the latest version:
```bash
npm run deploy
```
*Note: This runs `npm run build` to generate the `dist` folder, and then pushes to the `gh-pages` branch on GitHub automatically.*

## 📖 App Structure

- `/src/components` — Reusable, atomic React components (`CaesarPanel`, `VigenerePanel`, `StepTable`, `ResultBox`, etc.)
- `/src/utils` — Pure logic files isolating Cryptography Algorithms (`caesarCipher.js`, `vigenereCipher.js`)
- `vite.config.js` — Vite setup & Deployment base configuration.
- `index.css` — Centralized global styling schema & themes.

## 👨‍💻 Contributing

Issues and Pull Requests are welcome! Feel free to branch off, add a new Cipher (e.g., Playfair, Base64), and submit a PR for review.

## 📄 License

This application is free for educational and personal use.
