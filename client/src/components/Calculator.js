import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import axios from 'axios';

// Creating state variables for the calculator
const Calculator = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);


  // Function to handle button clicks
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === '=') {
        handleEqual();
      } else if (e.key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (e.key.toLowerCase() === 'c' || e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handles when user clicks number/operator buttons; adds it to input
  const handleClick = (val) => {
    setInput((prev) => prev + val);
  };

  const handleClear = () => {
    setInput('');
  };

//Evaluates the input and updates the history
const handleEqual = async () => {
  try {
    const result = evaluate(input).toString();
    setInput(result);

    const token = localStorage.getItem('token');
    if (token) {
      await axios.post('http://localhost:5000/api/history', {
        expression: input,
        result
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchHistory();
    }
  } catch {
    setInput('Error');
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(input);
  setCopied(true);
  setTimeout(() => setCopied(false), 1000);
};

const fetchHistory = useCallback(async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await axios.get('http://localhost:5000/api/history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setHistory(res.data);
  } catch {
    console.error('Failed to fetch history');
  }
}, []);

useEffect(() => {
  fetchHistory();
}, [fetchHistory]);




return (
  <div className="app-container">
    <div className="calculator">
      <h1>CloudCalc</h1>

      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter equation"
        />
        {copied && <div className="copied-animation">Copied!</div>}
      </div>

      <div className="button-row">
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button className="clear" onClick={handleClear}>C</button>
      </div>

      <div className="button-row">
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button className="operator" onClick={() => handleClick('*')}>×</button>
      </div>

      <div className="button-row">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button className="operator" onClick={() => handleClick('-')}>−</button>
      </div>

      <div className="button-row">
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button className="operator" onClick={() => handleClick('+')}>+</button>
        <button className="operator" onClick={() => handleClick('/')}>÷</button>
      </div>

      <div className="button-row">
        <button className="equals" onClick={handleEqual}>=</button>
      </div>

      <div className="button-row">
        <button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</button>
      </div>
    </div>

    <div className="history-panel">
      <h2>History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.expression} = {item.result}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
};

export default Calculator;
