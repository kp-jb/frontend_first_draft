import jwt from "jsonwebtoken";

export default function isTokenValid(token) {
  const decodedToken = jwt.decode(token);
  if (decodedToken && decodedToken.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  };
  return false;
};