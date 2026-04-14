export default function StepTable({ steps, mode, cipherType }) {
  if (!steps || steps.length === 0) return null;

  const isVigenere = cipherType === 'vigenere';

  return (
    <div className="step-table-container glass-card panel fade-in">
      <h3>Step-by-Step Breakdown</h3>
      <div className="step-table__wrapper">
        <table className="step-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Char</th>
              <th>Value</th>
              {isVigenere && <th>Key</th>}
              {isVigenere && <th>Key Val</th>}
              {!isVigenere && <th>Shift</th>}
              <th>Formula</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, i) => (
              <tr key={i}>
                <td>{step.position}</td>
                <td style={{ fontWeight: 600 }}>{step.original}</td>
                <td>{step.originalValue}</td>
                {isVigenere && <td style={{ color: 'var(--cyan-400)' }}>{step.keyChar}</td>}
                {isVigenere && <td>{step.keyValue}</td>}
                {!isVigenere && <td>{step.shift}</td>}
                <td className="step-table__formula">{step.formula}</td>
                <td className="step-table__result">{step.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
