import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../model/tokenpayload";

dotenv.config();

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "48hr",
  });
};

export const verifyToken = (token: string)  => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
  } catch {
    return null;
  }
};
