// src/contexts/AuthContext.tsx

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface JwtPayload {
  sub: string; // email
  FullName: string;
  UserId: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string; //role
  exp: number; //expired date for token
}

interface AuthContextType {
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      localStorage.setItem("token", token);
      const decoded = jwtDecode<JwtPayload>(token);
      setUser(decoded);
    } catch {
      console.error("Invalid token");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
