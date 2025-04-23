// Import the JWT library so we can verify tokens
const jwt = require('jsonwebtoken');

// This function is a middleware for protecting routes with JWT authentication
const authenticateToken = (req, res, next) => {
  // Get the value of the Authorization header (e.g., "Bearer <token>")
  const authHeader = req.headers['authorization'];

  // If the header exists, split it by space and get the token part
  // This means the header format must be: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is present, block access and return an error
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  // Verify the token using the secret key from your .env file
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If verification fails (e.g., token expired or invalid), deny access
    if (err) return res.status(403).json({ error: 'Invalid token.' });

    // If the token is valid, store the decoded payload in the request
    // This gives access to user info like ID for future route handlers
    req.user = decoded;

    // Call next() to allow the request to proceed to the protected route
    next();
  });
};

// Export the middleware function so it can be used in your routes
module.exports = authenticateToken;
