"use client";
import React, { ReactNode, useEffect } from "react";
import Aside from "../Aside";
import { useAuth } from "@/context/authContext";
import { InvalideRoute } from "../InvalideRoute";

const AdminLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const { user } = useAuth();
  // useEffect(() => {
  //   if (!user || user.role !== "admin") {
  //     window.location.href = "/";
  //   }
  // }, [user]);

  if (!user || user.role !== "admin") {
    return <InvalideRoute />;
  }
  return (
    <div className="flex">
      <div className=" w-1/5">
        <Aside />
      </div>
      <div className="flex flex-1 flex-col p-10">
        <div>
          <h2 className="text-5xl  font-serif text-primary text-start capitalize font-semibold mb-10 border-b-2 border-secondary inline-block">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
