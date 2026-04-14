import { useMemo } from 'react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function VigenereSquare({ highlightRow, highlightCol, highlightCell }) {
  const table = useMemo(() =>
    ALPHABET.map((_, row) =>
      ALPHABET.map((_, col) =>
        ALPHABET[(row + col) % 26]
      )
    ), []);

  return (
    <div className="vigenere-square-container">
      <h3>Vigenere Square (Tabula Recta)</h3>
      <p className="vigenere-square__label">Plaintext →</p>
      <div className="vigenere-square__wrapper">
        <table className="vigenere-square__table">
          <thead>
            <tr>
              <th></th>
              {ALPHABET.map((letter, i) => (
                <th
                  key={`col-${i}`}
                  className={highlightCol === i ? 'vs-highlight-col-header' : ''}
                >
                  {letter}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                <td
                  className={`vs-row-header ${highlightRow === rowIndex ? 'vs-highlight-row-header' : ''}`}
                >
                  {ALPHABET[rowIndex]}
                </td>
                {row.map((cell, colIndex) => {
                  let className = '';
                  if (highlightRow === rowIndex && highlightCol === colIndex) {
                    className = 'vs-highlight-cell';
                  } else if (highlightRow === rowIndex) {
                    className = 'vs-highlight-row';
                  } else if (highlightCol === colIndex) {
                    className = 'vs-highlight-col';
                  }
                  return (
                    <td key={`cell-${rowIndex}-${colIndex}`} className={className}>
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
