import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export const InvalideRoute = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-900">403</h1>
      <p className="text-lg text-gray-600 mt-4">
        Access denied. You do not have permission to view this page.
      </p>
      <div className="flex gap-5 mt-10">
        <Link href="/">
          <Button className=" rounded capitalize">Go back to Home</Button>
        </Link>
        <Link href="/Register/signin">
          <Button className=" rounded capitalize">signin as admin</Button>
        </Link>
      </div>
    </div>
  );
};
