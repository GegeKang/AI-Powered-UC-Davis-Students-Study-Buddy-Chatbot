import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (err) {
      setError('Failed to get response. Is the backend server running?');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>UC Davis Q&A Bot</h1>
        <p>Ask me anything about UC Davis!</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about UC Davis..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !query.trim()}>
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {answer && (
          <div className="answer-container">
            <h3>Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
      </main>

      <footer>
        <p>Powered by UC Davis AI Model</p>
      </footer>
    </div>
  );
}

export default App;
