import Image from "next/image";
import React from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import { CiLinkedin } from "react-icons/ci";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import Button from "../shared/Button";

interface doctor {
  id: number;
  name: string;
  specialty: {
    id: number;
    name: string;
  };
  img: string;
}

export default function DocCard({ doctor }: { doctor: doctor }) {
  return (
    <div className="h-96 w-60 bg-accent overflow-hidden rounded">
      <div className="h-2/3 w-full relative overflow-hidden">
        <img
          src={doctor.img}
          alt="doc"
          className=" h-full w-full object-cover"
        />
      </div>
      <div className="h-1/3 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center p-2 text-primary">
          <p className="text-xs mb-1">{doctor.name}</p>
          <p className=" font-bold mb-2">{doctor.specialty.name}</p>
          <div className="flex gap-3">
            <button className="bg-primary text-accent rounded-full text-sm p-1">
              <BiLogoLinkedin />
            </button>
            <button className="bg-primary text-accent rounded-full text-sm p-1">
              <BiLogoFacebook />
            </button>
            <button className="bg-primary text-accent rounded-full text-sm p-1">
              <BiLogoInstagram />
            </button>
          </div>
        </div>

        <Button
          title="View Profile"
          dark
          className=" rounded-none w-full self-end text-xs"
        />
      </div>
    </div>
  );
}
