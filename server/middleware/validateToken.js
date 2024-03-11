const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // The token is valid, and the `decoded` object contains the token's payload
    req.user = decoded;
    next();
  });
};

module.exports = validateToken;
