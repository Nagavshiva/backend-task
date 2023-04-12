const jwt = require("jsonwebtoken");

// Middleware function to authenticate a JWT token
exports.authenticateToken = (req, res, next) => {
  // Get the token from the authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  
  // If token is missing, return 401 Unauthorized status with error message
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  // Verify the token using the JWT_SECRET and extract the userId from the decoded token
  jwt.verify(token,process.env.JWT_SECRET, (error, decoded) => {
    // If there's an error during verification, return 403 Forbidden status with error message
    if (error) {
      console.error(error);
      return res.status(403).json({ message: "Invalid token" });
    }
    // If verification is successful, set the userId in the request object and call the next middleware function
    req.userId = decoded.userId;
    next();
  });
};

// Function to generate a JWT token with a userId as the payload
exports.generateToken = (userId) => {
  const payload = { userId };
  // Sign the payload with JWT_SECRET and set the token to expire in 1 hour
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

