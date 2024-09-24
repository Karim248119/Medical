import Header from "@/components/shared/Header";
import React from "react";
import Image from "next/image";
import { SPECIALTIES } from ".";

export default function Specialties() {
  return (
    <section className="-mb-20">
      <Header
        subtitle="Always Caring"
        title="Our Specialties"
        className="mb-8"
      />
      <div className="grid md:grid-cols-4 grid-cols-2 md:grid-rows-4  md:px-40">
        {SPECIALTIES.map((item, index) => (
          <div
            key={index}
            className="border-[1px] py-6 flex flex-col justify-center items-center gap-4 hover:bg-primary hover:text-accent duration-300"
          >
            <Image src={item.icon} alt={item.name} className="h-14 w-14" />
            <p className="md:text-base text-xs">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
