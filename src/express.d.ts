// src/express.d.ts

// This is a global type extension, so you don't need to import it
// anywhere. TypeScript will automatically find it.

declare namespace Express {
  interface Request {
    user?: {
      id: number;
      role: string;
    };
  }
}