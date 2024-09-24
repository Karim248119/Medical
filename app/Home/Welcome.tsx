import Header from "@/components/shared/Header";
import ImgWraper from "@/components/shared/ImgWraper";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiMoney } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

export default function Welcome() {
  const CARDS = [
    {
      title: "Book an Appointment",
    },
  ];
  return (
    <section className=" w-screen relative ">
      <div className="md:flex hidden gap-10 lex-col items-center justify-center absolute -top-10 left-1/2 -translate-x-1/2 text-nowrap">
        <div className="flex items-center justify-center gap-5 h-20 px-10 rounded bg-primary text-accent">
          <SlCalender size={50} />
          <p>Book an Appointment</p>
        </div>
        <div className="flex items-center justify-center gap-5 h-20 px-10 rounded text-primary bg-accent">
          <HiOutlineUserGroup size={50} />
          <p>Book an Appointment</p>
        </div>
        <div className="flex items-center justify-center gap-5 h-20 px-10 rounded text-white bg-secondary">
          <PiMoney size={50} />
          <p>Book an Appointment</p>
        </div>
      </div>
      <div className=" pt-40  flex flex-col justify-center items-center text-center gap-8">
        <Header
          subtitle="WELCOME TO MEDDICAL"
          title="A Great Place to Receive Care"
        />

        <p className=" md:px-52 px-5 md:text-base text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          placerat scelerisque tortor ornare ornare. Convallis felis vitae
          tortor augue. Velit nascetur proin massa in. Consequat faucibus
          porttitor enim et.
        </p>
        <button className="text-secondary flex justify-center items-center gap-2 m-auto">
          Learn More
          <FaArrowRight className="text-primary" />
        </button>
        <ImgWraper
          className=" md:w-2/3 w-[95%] md:h-[30vh] h-[15vh]  "
          src={IMGS.welcome}
        />
      </div>
    </section>
  );
}
