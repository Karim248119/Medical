import { IMGS } from "@/utilities/Image";
import React from "react";

export default function SubHead({ title }: { title: string }) {
  return (
    <div>
      <div
        className="w-full h-[25vh]"
        style={{
          backgroundImage: `url(${IMGS.welcome.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-white/50 flex items-center pl-32 relative">
          <div className=" w-40 h-40 rounded-full bg-secondary/50 -top-20 -left-20 absolute" />
          <h2 className="text-primary font-serif text-3xl font-semibold">
            {title}
          </h2>
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
