import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={` text-primary uppercase font-serif text-4xl md:block hidden ${className}`}
    >
      MED<span className=" text-secondary">ECAL</span>
    </div>
  );
}
