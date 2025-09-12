export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  is_banned : boolean;
}

export interface UserRole {
    role: "admin" | "employer" | "seeker";
}

export interface RegisterPayload {
  name: string;
  email: string;
  hashedPassword: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}
