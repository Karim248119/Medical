import Header from "@/components/shared/Header";
import ImgWraper from "@/components/shared/ImgWraper";
import { Button } from "@/components/ui/button";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { GiHospitalCross } from "react-icons/gi";

import { HiOutlineUserGroup } from "react-icons/hi2";

export default function Welcome() {
  const CARDS = [
    {
      title: "Book an Appointment",
      icon: <FaArrowLeft />,
      path: "#appointment",
    },
    {
      title: "Get a Quote",
      icon: <FaArrowRight />,
      path: "#our specialities",
    },
    {
      title: "Meet Our Team",
      icon: <HiOutlineUserGroup />,
      path: "#our team",
    },
  ];
  return (
    <section className=" w-screen relative ">
      <div className="md:flex hidden gap-10 lex-col items-center justify-center absolute -top-10 left-1/2 -translate-x-1/2 text-nowrap">
        <Link
          href="#appointment"
          className="flex items-center justify-center gap-5 h-20 px-10 rounded bg-primary text-accent"
        >
          <FaBriefcaseMedical size={50} />
          <p>Best Services</p>
        </Link>
        <Link
          href="#specialities"
          className="flex items-center justify-center gap-5 h-20 px-10 rounded text-primary bg-accent"
        >
          <GiHospitalCross size={50} />
          <p>Our Specialities</p>
        </Link>
        <Link
          href="#doctors"
          className="flex items-center justify-center gap-5 h-20 px-10 rounded text-white bg-secondary"
        >
          <HiOutlineUserGroup size={50} />
          <p>Meet Our Doctors</p>
        </Link>
      </div>
      <div className=" pt-40  flex flex-col justify-center items-center text-center gap-8">
        <Header
          subtitle="WELCOME TO MEDDICAL"
          title="A Great Place to Receive Care"
        />

        <p className=" md:px-52 px-5 md:text-base text-sm">
          We are committed to providing the highest quality of healthcare to our
          patients and the community. Our team of dedicated professionals works
          tirelessly to ensure that you receive the best care possible.
        </p>
        <Link href="/About">
          <Button
            variant="link"
            className="text-secondary flex justify-center items-center gap-2 m-auto"
          >
            Learn More
            <FaArrowRight className="text-primary" />
          </Button>
        </Link>
        <ImgWraper
          className=" md:w-2/3 w-[95%] md:h-[30vh] h-[15vh]  "
          src={IMGS.welcome}
        />
      </div>
    </section>
  );
}
