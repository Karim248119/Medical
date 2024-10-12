import { IMGS } from "@/utilities/Image";
import React from "react";

export default function SubHead({
  path,
  title,
  img = IMGS.welcome,
}: {
  path?: string;
  title: string;
  img?: any;
}) {
  return (
    <div>
      <div
        className="w-full h-[25vh]"
        style={{
          backgroundImage: `url(${img.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-white/50 flex items-center md:pl-32 pl-5 relative">
          <div className=" md:w-40 w-28 md:h-40 h-28 rounded-full bg-secondary/50 md:-top-20 md:-left-20 -top-14 -left-14 absolute" />
          <div className="flex flex-col z-20">
            <span className="text-primary font-light md:text-sm text-[10px]">
              {path}
            </span>
            <h2 className="text-primary font-serif md:text-5xl text-3xl font-semibold">
              {title}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full h-1 flex">
        <div className="w-1/3 h-full bg-accent" />
        <div className="w-2/3 h-full bg-primary" />
        <div className="w-1/3 h-full bg-secondary" />
      </div>
    </div>
  );
}
