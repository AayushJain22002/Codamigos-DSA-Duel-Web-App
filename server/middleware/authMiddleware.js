import admin from "firebase-admin";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // This attaches the user to the request
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;