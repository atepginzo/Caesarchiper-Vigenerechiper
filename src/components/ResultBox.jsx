export default function ResultBox({ result, onCopy, onUseAsInput, onClear, copied }) {
  const isEmpty = !result;

  return (
    <div className="result-box">
      <div className="result-box__header">
        <span className="result-box__title">Result</span>
        <div className="result-box__actions">
          <button
            className={`result-box__btn ${copied ? 'result-box__btn--copied' : ''}`}
            onClick={onCopy}
            disabled={isEmpty}
            id="btn-copy"
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            className="result-box__btn"
            onClick={onUseAsInput}
            disabled={isEmpty}
            id="btn-use-as-input"
          >
            Use as Input
          </button>
          <button
            className="result-box__btn"
            onClick={onClear}
            id="btn-clear"
          >
            Clear
          </button>
        </div>
      </div>
      <div className={`result-box__content ${isEmpty ? 'result-box__content--empty' : ''}`}>
        {result || 'Result will appear here...'}
      </div>
    </div>
  )
}
