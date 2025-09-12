import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_TOKEN || "super-secret-token";

export function checkUser(token: string): string | null {
  if (!token) {
    return null;
  }
  const decoded = jwt.verify(token, JWT_TOKEN) as JwtPayload;

  if (!decoded || typeof decoded !== "object" || !decoded.userId) {
    return null;
  }

  return decoded.userId
}