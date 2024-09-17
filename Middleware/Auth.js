const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers?.["authorization"];
    
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
        error: "No authorization header provided",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        error: "No token provided",
      });
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY environment variable not set");
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      return res.status(401).json({ status: false, msg: "Token is invalid" });
    }


    console.log("verifyToken",verifyToken);
    
    // Find user based on token data
    const user = await User.findOne({ where: { id: verifyToken.id } });
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        error: "User not found",
      });
    }

    // Attach user and token to request object
    req.user = user;
    req.token = token;

    return next();
  } catch (err) {
    console.error("Authentication Error:", err);
    return res.status(401).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
};

module.exports = authenticate;
