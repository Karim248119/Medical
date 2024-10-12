import React from "react";
import { ButtonProps } from "../ui/button";

interface button extends ButtonProps {
  title: string;
  className?: string;
  dark?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

export default function Button({
  title,
  className,
  dark,
  onClick,
  type,
  icon,
}: button) {
  return (
    <button
      className={`${dark ? "bg-primary text-accent" : "bg-accent text-primary"} 
        py-2 px-4 flex justify-center items-center gap-3 rounded-full duration-300 hover:bg-secondary hover:text-white md:text-base text-xs ${className}`}
    >
      {title}
      {icon && icon}
    </button>
  );
}
