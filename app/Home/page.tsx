"use client";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import Welcome from "./Welcome";
import Services from "./Services";
import Specialties from "./Specialties";
import Doctors from "./Doctors";
import Appointment from "./Appointment";
import News from "@/app/Home/News";
import UserLayout from "@/components/layout/UserLayout";
import Link from "next/link";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <UserLayout>
      <div className=" relative w-screen md:h-[calc(100vh-160px)] h-[50vh]">
        <div
          className="w-full h-full  text-white  flex items-center "
          style={{
            backgroundImage: `url(${
              isMobile ? IMGS.homeMob.src : IMGS.home.src
            })`,
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          <div className="flex flex-col md:gap-8 gap-5 text-start md:p-20 p-6 font-semibold">
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className=" text-shadow-md md:text-xl text-sm text-secondary uppercase"
            >
              Caring for Life
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="md:text-6xl text-xl text-primary font-serif mb-14 flex flex-col md:gap-4 gap-1"
            >
              <p>Leading the Way</p>
              <p>in Medical Excellence</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Link href="#appointment">
                <Button title="Book an Appointment" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20 pb-20">
        <Welcome />
        <Services />
        <Specialties />
        <Appointment />
        <Doctors />
        <News />
      </div>
    </UserLayout>
  );
}
