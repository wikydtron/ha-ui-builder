import { Component, type ReactNode } from 'react';
interface Props { children: ReactNode; }
interface State { error: Error | null; }
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#1c1c1c', color: '#e1e1e1', minHeight: '100vh', padding: '40px', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#f44336', marginBottom: '12px' }}>App crashed</h2>
          <pre style={{ background: '#2c2c2c', padding: '20px', borderRadius: '8px', color: '#ff9800', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {this.state.error.message + '\n\n' + this.state.error.stack}
          </pre>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ marginTop: '20px', background: '#03a9f4', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
            Clear storage and reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
