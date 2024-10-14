"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLogedin: boolean;
  setIsLogedin: (isLogedin: boolean) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLogedin, setIsLogedin] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLogedin, setIsLogedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
