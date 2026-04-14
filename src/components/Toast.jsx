export default function Toast({ visible, message }) {
  return (
    <div className={`toast ${visible ? 'toast--visible' : ''}`} role="alert">
      <span style={{ marginRight: '8px', fontWeight: 'bold' }}>INFO:</span>
      {message}
    </div>
  )
}
