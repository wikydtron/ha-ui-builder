import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'

// Wipe any stale localStorage that might crash store init
try {
  const keys = Object.keys(localStorage);
  keys.forEach(k => {
    if (k.startsWith('ha-')) localStorage.removeItem(k);
  });
} catch { /* ignore */ }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
