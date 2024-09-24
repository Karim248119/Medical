import Image from "next/image";
import React from "react";

export default function ImgWraper({
  src,
  className,
}: {
  src: any;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover "
      />
      <div className="w-full h-1 flex absolute bottom-0">
        <div className="w-1/3 h-full bg-accent" />
        <div className="w-2/3 h-full bg-primary" />
        <div className="w-1/3 h-full bg-secondary" />
      </div>
    </div>
  );
}
