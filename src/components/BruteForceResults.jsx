export default function BruteForceResults({ results, onSelectShift }) {
  if (!results || results.length === 0) return null;

  const bestIndex = results.reduce((best, cur, i) =>
    cur.score > results[best].score ? i : best, 0);

  return (
    <div className="brute-force glass-card panel fade-in">
      <h3>Brute Force Results</h3>
      <p className="brute-force__desc">
        All 25 possible shifts are shown below. Click any result to apply that shift value.
      </p>
      <div className="brute-force__list">
        {results.map((item, i) => (
          <div
            key={item.shift}
            className={`brute-force__item ${i === bestIndex ? 'brute-force__item--best' : ''}`}
            onClick={() => onSelectShift(item.shift)}
            id={`brute-force-shift-${item.shift}`}
          >
            <span className="brute-force__shift">Shift {item.shift}</span>
            <span className="brute-force__text">{item.result}</span>
            {i === bestIndex && (
              <span className="brute-force__badge">
                Most Likely
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
