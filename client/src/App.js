import React, { useState } from 'react';
import Calculator from './components/Calculator';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import './Calculator.css';



function App() {
  const [view, setView] = useState('login'); // 'login', 'signup', or 'calculator'

  const handleAuth = (user) => {
    console.log('✅ Signed up:', user);
    setView('calculator'); // optionally redirect after signup
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setView('signup')}>Signup</button>
        <button onClick={() => setView('login')}>Login</button>
        <button onClick={() => setView('calculator')}>Calculator</button>
      </nav>

      {view === 'signup' && <SignupForm />}
      {view === 'login' && <LoginForm onLogin={() => setView('calculator')} />}
      {view === 'calculator' && <Calculator />}
    </div>
  );
}

export default App;
