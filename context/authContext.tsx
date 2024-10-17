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
  const [user, setUser] = useState<User | null>(null);
  const [isLogedin, setIsLogedin] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false); // Flag to check if client-side

  useEffect(() => {
    setIsClient(true); // Now it's safe to access client-side storage

    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  useEffect(() => {
    if (isClient && user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, isClient]);

  if (!isClient) {
    // If it's still server-side, avoid rendering the children to prevent mismatches
    return null;
  }

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
