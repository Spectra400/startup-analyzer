import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import IdeaForm from './pages/IdeaForm';
import Results from './pages/Results';
import History from './pages/History';

// ─── Error Boundary ────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#050510',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          padding: 40,
          fontFamily: 'DM Sans, sans-serif',
          gap: 16,
        }}>
          <h2 style={{ color: '#FF006E', margin: 0, fontSize: 22 }}>Something went wrong</h2>
          <pre style={{
            color: '#94A3B8',
            fontSize: 12,
            background: 'rgba(255,255,255,0.05)',
            padding: 16,
            borderRadius: 8,
            maxWidth: 600,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '10px 24px',
              background: '#00D4FF',
              border: 'none',
              borderRadius: 8,
              color: '#000',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── App ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#050510',
      overflowX: 'hidden',
      width: '100%'
    }}>
      <div className="star-bg" />
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/"        element={<Landing />} />
          <Route path="/analyze" element={<IdeaForm />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
