export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "employer" | "seeker";
}

export interface RegisterPayload {
  name: string;
  email: string;
  hashedPassword: string;
  role: "admin" | "employer" | "seeker";
}

export interface LoginPayload {
  email: string;
  password: string;
}
