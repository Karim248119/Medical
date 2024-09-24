"use client";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiBarChart, BiMenu } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaSearch } from "react-icons/fa";
import { HiBars2, HiBars3 } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import Button from "./shared/Button";

export default function Navbar() {
  const [IsOpened, setIsOpened] = useState(false);

  const Links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Services", path: "/Services" },
    { name: "Doctors", path: "/Doctors" },
    { name: "News", path: "/News" },
    { name: "Contact", path: "/Contact" },
  ];
  const Headers = [
    {
      icon: IMGS.phone,
      title: "Emergency",
      txt: "(237) 681-812-255",
    },
    {
      icon: IMGS.location,
      title: "Location",
      txt: "166 90th North st.",
    },
    {
      icon: IMGS.clock,
      title: "Working Hours",
      txt: "8:00 AM - 5:00 PM",
    },
  ];
  const pathName = usePathname();
  return (
    <nav className=" fixed top-0 left-0 w-screen z-50">
      <div className=" h-20 bg-white w-full flex justify-between items-center md:px-32 z-50">
        <p className=" text-primary uppercase font-serif text-4xl md:block hidden">
          MED<span className=" text-secondary">ECAL</span>
        </p>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {Headers.map((header, index) => {
            return (
              <div
                key={index}
                className="flex gap-2 md:text-sm text-[8px] items-center"
              >
                <Image
                  className=" md:h-10 md:w-10 h-5 w-5 "
                  src={header.icon}
                  alt="phone"
                />
                <div>
                  <p className="text-primary">{header.title}</p>
                  <p className="text-secondary">{header.txt}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" bg-primary text-sm z-50">
        <div className=" bg-primary md:h-20 h-16 w-full flex justify-between  items-center flex-row px-4 md:px-20 text-white z-30">
          <div className="sm:flex justify-center items-center gap-5 hidden  ">
            {Links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`${
                    link.path === pathName && " text-accent font-semibold"
                  }  capitalize transition-all  p-1 xl:text-sm text-xs `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-4">
            <button className="sm:block hidden">
              <CiSearch size={25} />
            </button>
            <Button title="Appointment" className="hidden md:block" />

            <p className=" text-accent uppercase font-serif text-xl block md:hidden ">
              MED<span className=" text-white">ECAL</span>
            </p>
          </div>

          <div className="sm:hidden flex gap-2 ">
            <button>
              <CiSearch size={22} />
            </button>
            <button onClick={() => setIsOpened(!IsOpened)}>
              {IsOpened ? <IoCloseOutline size={25} /> : <HiBars3 size={25} />}
            </button>
          </div>
        </div>
        <div
          className={`${
            IsOpened ? " top-36" : "-top-40"
          } w-[100vw] flex flex-col items-center justify-center pb-3 overflow-hidden navs sm:hidden  -z-20 bg-accent text-xs text-center gap-2 font-semibold fixed  transition-all ease duration-700`}
        >
          <div className=" -mt-10 mb-10"></div>

          {Links.map((link) => {
            return (
              <Link
                onClick={() => setIsOpened(!IsOpened)}
                key={link.name}
                href={link.path}
                className={`${
                  link.path === pathName && " font-bold text-secondary"
                }  capitalize text-primary text-xs p-1`}
              >
                {link.name}
              </Link>
            );
          })}
          <Button title="Appointment" dark={true} />
        </div>
      </div>
    </nav>
  );
}
