"use client";
import React from "react";
import { AdminLinks } from "./Navlinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Aside = () => {
  const pathName = usePathname();
  return (
    <aside className="w-1/5 h-full min-h-screen bg-primary md:block hidden fixed">
      <p className=" text-white uppercase font-serif text-4xl md:block hidden text-center mt-14">
        MED<span className=" text-secondary">ECAL</span>
      </p>
      <div className="py-10 ">
        {AdminLinks.map((link, index) => (
          <div
            key={index}
            className={`${
              link.path === pathName && "bg-accent/20"
            } flex flex-col`}
          >
            <Link
              key={index}
              href={link.path}
              className={`text-white/50 uppercase  text-lg flex w-1/2  self-center items-center gap-3 py-5`}
            >
              {link.icon && (
                <link.icon
                  className={`${link.path === pathName && "text-secondary"} `}
                  size={22}
                />
              )}
              <p
                className={`${
                  link.path === pathName && " text-white font-semibold"
                }  capitalize transition-all `}
              >
                {link.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Aside;
