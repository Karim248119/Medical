import React from "react";
import { FaTelegram } from "react-icons/fa";
import Button from "./shared/Button";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTelegram,
} from "react-icons/bi";
import Image from "next/image";

const Socials = [
  { id: 1, icon: <BiLogoFacebook /> },
  { id: 2, icon: <BiLogoInstagram /> },
  { id: 3, icon: <BiLogoLinkedin /> },
];

export default function Footer() {
  return (
    <footer className="bg-primary w-full text-white/50 underline-offset-4  md:text-xs text-[8px] pb-5">
      <div className="grid md:grid-cols-4 md:grid-rows-1 grid-cols-2 grid-rows-2 mx-auto p-4 pt-6 md:p-6 md:px-20 md:gap-20 gap-5">
        <div className="flex flex-col md:gap-3 gap-1">
          <h3 className="text-accent md:text-4xl text-lg font-light font-serif">
            MEDECAL
          </h3>
          <p className="md:text-base text-xs">Leading the Way in Medical</p>
          <p className="md:text-base text-xs">Execellence, Trusted Care.</p>
        </div>
        <div className="flex flex-col md:gap-3 gap-1 ">
          <h3 className="text-white md:text-xl text-sm font-semibold">
            Important Links
          </h3>
          <p className="hover:underline cursor-pointer">Appointment</p>
          <p className="hover:underline cursor-pointer">Doctors</p>
          <p className="hover:underline cursor-pointer">Services</p>
          <p className="hover:underline cursor-pointer">About Us</p>
        </div>
        <div className="flex flex-col md:gap-3 gap-1 ">
          <h3 className="text-white md:text-xl text-sm font-semibold">
            Contact Us
          </h3>
          <p className="hover:underline cursor-pointer">
            Call: (237) 681-812-255
          </p>
          <p className="hover:underline cursor-pointer">
            Email: fildineesoe@gmail.com
          </p>
          <p className="hover:underline cursor-pointer">
            Address: 0123 Some place
          </p>
          <p className="hover:underline cursor-pointer">Some country</p>
        </div>
        <div className="flex flex-col md:gap-3 gap-1 ">
          <h3 className="text-white md:text-xl text-sm font-semibold">
            Newsletter
          </h3>
          <Button
            title="Enter your email address"
            icon={<BiLogoTelegram size={24} />}
            className="rounded-sm md:px-2 text-xs"
          />
        </div>
      </div>
      <div className="bg-accent h-[1px] w-2/3 m-auto my-5" />
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center  w-2/3 m-auto">
        <p className=" text-center md:text-lg text-xs ">
          © 2021 Hospital’s name All Rights Reserved by PNTEC-LTD
        </p>
        <div className="flex text-primary  justify-between items-center gap-3 ">
          {Socials.map((social, index) => (
            <button
              key={social.id}
              className="md:p-2 p-1 bg-accent rounded-full md:text-xl "
            >
              {social.icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
