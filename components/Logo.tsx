import { ICONS } from "@/utilities/Icons";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";
import React from "react";

export default function Logo({
  variant = 1,
  className,
}: {
  variant?: number;
  className?: string;
}) {
  return (
    <Image
      src={
        variant === 1 ? ICONS.logo1 : variant === 2 ? ICONS.logo2 : ICONS.logo3
      }
      alt="Logo"
      width={500}
      height={500}
      className={`md:w-40 w-24 aspect-[2/1] ${className}`}
    ></Image>
  );
}
