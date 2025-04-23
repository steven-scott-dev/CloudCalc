// Import React and useful hooks from the library
import React, { useState, useEffect, useCallback } from 'react';
// Axios is used to make HTTP requests to the backend API
import axios from 'axios';
// 'evaluate' is a function from mathjs to safely compute math expressions
import { evaluate } from 'mathjs';
// Import the CSS styles specific to this component
import './Calculator.css';

// The Calculator component (this is the main calculator page)
const Calculator = () => {
  // State for the input field (what the user types)
  const [input, setInput] = useState('');
  // State to track if the result has been copied to clipboard
  const [copied, setCopied] = useState(false);
  // State to store the user's calculation history
  const [history, setHistory] = useState([]);

  // Function to fetch user's calculation history from the backend
  const fetchHistory = useCallback(async () => {
    try {
      // Get the JWT token from localStorage to authorize the request
      const token = localStorage.getItem('token');
      // Make a GET request to the /api/history route on your server
      const res = await axios.get('http://localhost:5000/api/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Save the returned data into state
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  }, []);

  // Load the history once when the component is first rendered
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Function that runs when user clicks "=" or presses Enter
  const handleEqual = useCallback(async () => {
    try {
      // Use mathjs to evaluate the current input string
      const result = evaluate(input).toString();
      // Update the input display with the result
      setInput(result);
      setCopied(false); // reset copied status

      // Get JWT token to authorize the POST request
      const token = localStorage.getItem('token');

      // Save the new calculation to the backend
      await axios.post(
        'http://localhost:5000/api/history',
        { expression: input, result },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // After saving, refresh the history list
      fetchHistory();
    } catch (err) {
      console.error('❌ Calculation error:', err.message || err);
      // Show "Error" in the input if something went wrong
      setInput('Error');
    }
  }, [input, fetchHistory]);

  // Clears the input when "C" is pressed
  const handleClear = useCallback(() => {
    setInput('');
    setCopied(false);
  }, []);

  // Add keyboard shortcut support (Enter to evaluate, C or Escape to clear)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === '=') {
        handleEqual();
      } else if (['c', 'C', 'Escape'].includes(e.key)) {
        handleClear();
      }
    };
    // Attach event listener to key presses
    window.addEventListener('keydown', handleKeyDown);
    // Clean up the listener when the component is removed
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEqual, handleClear]);

  // Function to append a number or operator when a button is clicked
  const handleClick = (value) => {
    setInput((prev) => prev + value);
    setCopied(false);
  };

  // Copy the result to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    // Reset the "Copied!" message after 1 second
    setTimeout(() => setCopied(false), 1000);
  };

  // JSX that renders the UI
  return (
    <div className="app-container">
      {/* Calculator Section */}
      <div className="calculator">
        <h1>CloudCalc</h1>

        {/* Input Display */}
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter equation"
          />
          {copied && <div className="copied-animation">Copied!</div>}
        </div>

        {/* Calculator Buttons */}
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
          <button className="operator" onClick={() => handleClick('.')}>.</button>
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

      {/* Calculation History Section */}
      <div className="history-panel">
        <h2>History</h2>
        {history.length === 0 ? (
          <p>No history yet.</p>
        ) : (
          <ul>
            {history.map((item) => (
              <li key={item.id}>
                {item.expression} = {item.result}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Export the component so it can be used in other files (like App.js)
export default Calculator;
