import Image from "next/image";
import React from "react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
} from "react-icons/bi";
import Button from "../shared/Button";
import Link from "next/link";
import { IMG_URL } from "@/api";

interface doctor {
  _id: number;
  name: string;
  sp_id: {
    _id: number;
    title: string;
  };
  img: string;
}

export default function DocCard({ doctor }: { doctor: doctor }) {
  return (
    <div className="h-96 w-60 bg-accent overflow-hidden rounded">
      <div className="h-2/3 w-full relative overflow-hidden">
        <img
          src={IMG_URL + doctor.img}
          alt="doc"
          className=" h-full w-full object-cover object-top"
        />
      </div>
      <div className="h-1/3 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center p-2 text-primary">
          <p className="text-xs mb-1">{doctor.name}</p>
          <p className=" font-bold mb-2">{doctor.sp_id.title}</p>
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
        <Link
          href={{
            pathname: `Doctors/${doctor._id}`,
            query: { data: JSON.stringify(doctor) },
          }}
        >
          <Button
            title="View Profile"
            dark
            className=" rounded-none w-full self-end text-xs"
          />
        </Link>
      </div>
    </div>
  );
}
