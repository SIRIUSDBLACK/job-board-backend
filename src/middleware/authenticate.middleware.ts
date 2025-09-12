import dotenv from "dotenv";
import { verifyToken } from "../utils/jwt";
import { TokenPayload } from "../model/tokenpayload";

dotenv.config();

export const authenticationMiddleware = (
  req: any,
  res: any,
  next: any
) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authentication failed. No token provided" });
  }

  const token: string = authHeader.split(" ")[1]!;

  try {
    const decoded: TokenPayload = verifyToken(token)!;
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Invalid token." });
  }
};
