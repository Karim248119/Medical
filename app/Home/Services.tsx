import Button from "@/components/shared/Button";
import Header from "@/components/shared/Header";
import ImgWraper from "@/components/shared/ImgWraper";
import { IMGS } from "@/utilities/Image";
import Link from "next/link";
import React from "react";
import { IoBandageOutline } from "react-icons/io5";
import { LuHeartPulse } from "react-icons/lu";
import { MdOutlineBloodtype } from "react-icons/md";
import { PiDna } from "react-icons/pi";

export default function Services() {
  const Services = [
    {
      title: "Free Checkup",
      icon: <IoBandageOutline />,
    },
    {
      title: "Cardiogram",
      icon: <LuHeartPulse />,
    },
    {
      title: "DNA Testing",
      icon: <PiDna />,
    },
    {
      title: "Blood Bank",
      icon: <MdOutlineBloodtype />,
    },
  ];
  const Col1 = [
    "A Passion for Healing",
    "All our best",
    "A Legacy of Excellence",
  ];
  const Col2 = ["Believe in Us", "Believe in Us", "Always Caring"];
  return (
    <section className=" ">
      <Header
        subtitle="Care you can believe in"
        title="Our Services"
        className="pb-10"
      />
      <div className="md:px-40 md:grid md:grid-cols-7">
        <div className="col-span-1 p-3 md:p-0">
          <div className="grid md:grid-rows-4 md:grid-cols-1 grid-rows-2 grid-cols-2 rounded border-[1px] ">
            {Services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center py-4 gap-2 hover:bg-primary hover:text-accent duration-300 transition-all ease-in-out"
              >
                <div className="text-4xl text-secondary">{service.icon}</div>
                <h2 className=" text-sm">{service.title}</h2>
              </div>
            ))}
          </div>
          <Link href="/Services">
            <Button title="View All" dark className=" rounded-none w-full" />
          </Link>
        </div>
        <div className="col-span-4  py-4 px-16 md:flex hidden flex-col gap-5 ">
          <h4 className="text-2xl font-semibold">
            A passion for putting patients first.
          </h4>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              {Col1.map((text, index) => (
                <div key={index} className="flex  items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-secondary" />
                  <div className="">{text}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {Col2.map((text, index) => (
                <div key={index} className="flex  items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-secondary" />
                  <div className="">{text}</div>
                </div>
              ))}
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
            voluptatum quibusdam iste reiciendis voluptatibus omnis numquam
            debitis doloremque repellendus quod sequi fugiat eius labore, nemo
            recusandae alias commodi voluptas minima!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
            voluptatum quibusdam iste reiciendis voluptatibus omnis numquam
            debitis doloremque repellendus quod sequi fugiat eius labore, nemo
            recusandae alias commodi voluptas minima!
          </p>
        </div>
        <div className=" col-span-2 md:flex hidden flex-col justify-center items-center text-center gap-3">
          <ImgWraper src={IMGS.services} className="w-full h-1/2" />
          <ImgWraper src={IMGS.services2} className="w-full h-1/2" />
        </div>
      </div>
    </section>
  );
}
