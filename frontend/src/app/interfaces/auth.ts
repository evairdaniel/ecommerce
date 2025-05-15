import type { ReactNode } from "react";
import type { User } from "./user";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
 access_token: string;
  user: User;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}