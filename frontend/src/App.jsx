import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [typewriterEffect, setTypewriterEffect] = useState('');
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (answer && showTyping) {
      let i = 0;
      const typing = setInterval(() => {
        setTypewriterEffect(answer.substring(0, i));
        i++;
        if (i > answer.length) {
          clearInterval(typing);
          setShowTyping(false);
        }
      }, 30);
      
      return () => clearInterval(typing);
    }
  }, [answer, showTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setAnswer('');
    setTypewriterEffect('');
    
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
      setShowTyping(true);
    } catch (err) {
      setError('Failed to get response. Is the backend server running?');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Decorative elements */}
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>
      
      <div className="app-container">
        <header>
          <h1>Study Buddy Bot</h1>
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
                {loading ? (
                  <span className="loading-animation">
                    Thinking<span>.</span><span>.</span><span>.</span>
                  </span>
                ) : 'Ask'}
              </button>
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}

          {(answer || showTyping) && (
            <div className="answer-container">
              <h3>Answer:</h3>
              <p>{showTyping ? typewriterEffect : answer}</p>
            </div>
          )}
        </main>

        <footer>
          <p>Model was fine-tuned by Gezheng, Mark, Vivian, and Aliyah</p>
        </footer>
      </div>
    </>
  );
}

export default App;
