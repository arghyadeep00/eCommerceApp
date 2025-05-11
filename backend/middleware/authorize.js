import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Attach user data to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    res.status(400).json({
      success: false,
      message: "Authorization failed. Please try again.",
    });
  }
};

export default authorize;
