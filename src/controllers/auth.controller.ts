import { createUser, findByEmail } from "../db/auth.queries";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const isUserExist = await findByEmail(email);

    if (isUserExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({ name, email, hashedPassword, role });
    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).json({
      token,
      message: "registeration completed",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Email or password needed to complete the login",
      });
    }

    const user = await findByEmail(email);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if(user.is_banned){
      return res.status(403).json({
        message : "User is banned"
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.status(200).json({
      token,
      message: "Login complete",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};
