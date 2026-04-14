import { useMemo } from 'react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function CaesarWheel({ shift }) {
  const cx = 200, cy = 200;
  const outerR = 170, innerR = 120, dotR = 145;

  const outerLetters = useMemo(() =>
    ALPHABET.map((letter, i) => {
      const angle = (i * 360 / 26 - 90) * (Math.PI / 180);
      return {
        letter,
        x: cx + outerR * Math.cos(angle),
        y: cy + outerR * Math.sin(angle),
      };
    }), []);

  const innerLetters = useMemo(() =>
    ALPHABET.map((_, i) => {
      const shiftedIndex = (i + shift) % 26;
      const letter = ALPHABET[shiftedIndex];
      const angle = (i * 360 / 26 - 90) * (Math.PI / 180);
      return {
        letter,
        x: cx + innerR * Math.cos(angle),
        y: cy + innerR * Math.sin(angle),
        angle: i * 360 / 26,
      };
    }), [shift]);

  const dots = useMemo(() =>
    ALPHABET.map((_, i) => {
      const angle = (i * 360 / 26 - 90) * (Math.PI / 180);
      return {
        x: cx + dotR * Math.cos(angle),
        y: cy + dotR * Math.sin(angle),
      };
    }), []);

  return (
    <div className="caesar-wheel-container">
      <h3>Interactive Caesar Wheel</h3>
      <svg
        className="caesar-wheel"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--cyan-400)" />
            <stop offset="100%" stopColor="var(--emerald-400)" />
          </linearGradient>
        </defs>

        {/* Outer ring */}
        <circle
          cx={cx} cy={cy} r={outerR + 18}
          className="caesar-wheel__outer-circle"
          strokeWidth="1"
        />
        <circle
          cx={cx} cy={cy} r={outerR - 14}
          className="caesar-wheel__outer-circle"
          strokeWidth="0.5"
        />

        {/* Inner ring */}
        <circle
          cx={cx} cy={cy} r={innerR + 14}
          className="caesar-wheel__inner-circle"
          strokeWidth="1"
        />
        <circle
          cx={cx} cy={cy} r={innerR - 14}
          className="caesar-wheel__inner-circle"
          strokeWidth="0.5"
        />

        {/* Center decoration */}
        <circle cx={cx} cy={cy} r="30" fill="none" stroke="var(--border-accent)" strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r="5" fill="var(--cyan-500)" filter="url(#glow)" opacity="0.6" />

        {/* Direction arrow at top */}
        <polygon
          points={`${cx},${cy - outerR - 26} ${cx - 6},${cy - outerR - 18} ${cx + 6},${cy - outerR - 18}`}
          fill="var(--cyan-400)"
          filter="url(#glow)"
        />

        {/* Connection dots */}
        {dots.map((dot, i) => (
          <circle
            key={`dot-${i}`}
            cx={dot.x}
            cy={dot.y}
            r="2"
            className={`caesar-wheel__dot ${shift > 0 ? 'caesar-wheel__dot--active' : ''}`}
          />
        ))}

        {/* Outer letters (plaintext - static) */}
        {outerLetters.map((item, i) => (
          <text
            key={`outer-${i}`}
            x={item.x}
            y={item.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="caesar-wheel__outer-letter"
          >
            {item.letter}
          </text>
        ))}

        {/* Inner letters (ciphertext - rotated) */}
        <g style={{
          transform: `rotate(${-shift * (360 / 26)}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {ALPHABET.map((letter, i) => {
            const angle = (i * 360 / 26 - 90) * (Math.PI / 180);
            return (
              <text
                key={`inner-${i}`}
                x={cx + innerR * Math.cos(angle)}
                y={cy + innerR * Math.sin(angle)}
                textAnchor="middle"
                dominantBaseline="central"
                className="caesar-wheel__inner-letter"
                filter="url(#glow)"
              >
                {letter}
              </text>
            );
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="caesar-wheel__legend">
        <div className="caesar-wheel__legend-item">
          <div className="caesar-wheel__legend-dot caesar-wheel__legend-dot--plain" />
          Plaintext
        </div>
        <div className="caesar-wheel__legend-item">
          <div className="caesar-wheel__legend-dot caesar-wheel__legend-dot--cipher" />
          Ciphertext
        </div>
        <div className="caesar-wheel__legend-item">
          <div className="caesar-wheel__legend-dot caesar-wheel__legend-dot--selected" />
          Selected
        </div>
      </div>
    </div>
  )
}
