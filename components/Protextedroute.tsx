"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = "/Register/signin";
    } else if (user.role !== "admin") {
      window.location.href = "/403";
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
