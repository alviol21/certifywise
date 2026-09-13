import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, fontFamily: 'monospace', color: '#e74c3c', background: '#0b1622', minHeight: '100vh', whiteSpace: 'pre-wrap', fontSize: 13 }}>
          <h2 style={{ color: '#c59b44' }}>Ошибка на странице</h2>
          <p>Скриншот этого текста поможет найти причину:</p>
          <div style={{ background: '#12253b', padding: 12, borderRadius: 8, marginTop: 10 }}>
            {String((this.state.error && this.state.error.stack) || this.state.error)}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary><App /></ErrorBoundary>
)
