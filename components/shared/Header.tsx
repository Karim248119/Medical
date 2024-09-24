import React from "react";

export default function Header({
  subtitle,
  title,
  className,
}: {
  subtitle: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={` text-center px-5 ${className}`}>
      <h2 className=" text-secondary md:text-base text-sm font-bold uppercase mb-2 tracking-widest">
        {subtitle}
      </h2>
      <h3 className=" text-primary md:text-3xl text-2xl font-serif font-semibold tracking-wider scale-y-105">
        {title}
      </h3>
    </div>
  );
}
