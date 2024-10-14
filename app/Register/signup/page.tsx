"use client";
import React, { useEffect } from "react";
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
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { addUser } from "@/api/users";
import { useAuth } from "@/context/authContext";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { setIsLogedin, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await addUser(userData);
      if (response?.success) {
        setUser(response.user);
        setIsLogedin(true);
        window.location.href = "/";
      } else {
        console.error("Signup failed:", response);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="md:grid grid-cols-2 h-screen">
      <div className="hidden md:flex">
        <Logo className="absolute top-10 left-10" />
        <Image
          src={IMGS.signup}
          width={10000}
          height={10000}
          className="h-screen w-full object-cover"
          alt="signup"
        />
      </div>
      <div className="h-screen flex items-center justify-center px-5 md:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-4xl font-serif text-primary text-start capitalize font-semibold mb-5 border-b-2 border-secondary inline-block">
            Sign Up
          </h2>

          <div>
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter your name"
                className="pl-10"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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

          <div>
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="passwordConfirm"
                type="password"
                {...register("passwordConfirm")}
                placeholder="Confirm your password"
                className="pl-10"
              />
            </div>
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full m-0">
            Sign Up
          </Button>

          <p className="text-sm text-center">
            Already have an account?
            <Link href="/Register/signin">
              <Button
                type="submit"
                variant="link"
                className="text-secondary px-2"
              >
                Sign In
              </Button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
