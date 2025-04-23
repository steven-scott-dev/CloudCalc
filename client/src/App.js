// Import React and the useState hook for handling component state
import React, { useState } from 'react';

// Import the custom components you created
import Login from './components/Login';
import Signup from './components/Signup';
import Calculator from './components/Calculator';

// This is the main App component that controls the whole application
function App() {
  // This state stores the current logged-in user (null if not logged in)
  const [user, setUser] = useState(null);

  // This state determines whether to show the signup form or the login form
  const [showSignup, setShowSignup] = useState(false);

  // If there's no user logged in, show either the Login or Signup component
  if (!user) {
    return (
      <div>
        {/* If showSignup is true, show the Signup form */}
        {showSignup ? (
          <>
            {/* Pass the setUser function to update the user when signup is successful */}
            <Signup onAuth={setUser} />

            <p>
              Already have an account?{' '}
              {/* Toggle to show Login form */}
              <button onClick={() => setShowSignup(false)}>Log In</button>
            </p>
          </>
        ) : (
          <>
            {/* If not signing up, show the Login form */}
            <Login onAuth={setUser} />

            <p>
              Don't have an account?{' '}
              {/* Toggle to show Signup form */}
              <button onClick={() => setShowSignup(true)}>Sign Up</button>
            </p>
          </>
        )}
      </div>
    );
  }

  // If the user is logged in, show the calculator and a logout button
  return (
    <div>
      {/* Logout button: clears the token and resets the user state to null */}
      <button onClick={() => {
        localStorage.removeItem('token'); // Remove saved token from browser
        setUser(null);                    // Log the user out in the app
      }}>
        Log Out
      </button>

      {/* Render the Calculator component */}
      <Calculator />
    </div>
  );
}

// Export the App component so it can be used in index.js
export default App;
