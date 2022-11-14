import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(501).json("you are unauthenticated");

  jwt.verify(token, process.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(501).json("you are unauthenticated");
    }
    req.user = user;
    next();
  });
};
