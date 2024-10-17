"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { login } from "@/api/users";
import { useAuth } from "@/context/authContext";

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const { setUser } = useAuth();
  const [invalide, setInvalide] = useState<boolean>(false);

  const onSubmit = async (data: SigninFormData) => {
    const response = await login(data as any);
    if (response) {
      setUser(response.user);
      window.location.href = "/";
      localStorage.setItem("token", response.user.token);
      console.log("Login successful:", response);
    } else {
      setInvalide(true);
      console.log("Login failed");
    }
  };

  return (
    <div className="md:grid grid-cols-2 h-screen">
      <div className="flex">
        <Logo className="absolute top-10 left-10" />
        <Image
          src={IMGS.signin}
          width={10000}
          height={10000}
          className="h-screen w-full object-cover hidden md:block"
          alt="signin"
        />
      </div>
      <div className="h-screen flex items-center justify-center px-5 md:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-4xl font-serif text-primary text-start capitalize font-semibold mb-5 border-b-2 border-secondary inline-block">
            Sign In
          </h2>

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                {...register("email")}
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
          {invalide && (
            <p className="text-red-500">Invalide email or password</p>
          )}
          <p className="text-sm text-center">
            Don&apos;t have an account?
            <Link href="/Register/signup">
              <Button variant="link" className="text-secondary px-2">
                Sign Up
              </Button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
