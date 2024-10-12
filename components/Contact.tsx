import React from "react";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { GrLocation } from "react-icons/gr";
import { BsEnvelopeAt } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";

export default function Contact({
  isCantactPage = false,
}: {
  isCantactPage?: boolean;
}) {
  const contactData = [
    {
      h: "emergancy",
      p1: "(+20) 681-812-255",
      p2: "(+20) 666-331-894",
      icon: <LiaPhoneVolumeSolid />,
    },
    {
      h: "location",
      p1: "166 90th North st.",
      p2: "New cairo, Egypt",
      icon: <GrLocation />,
    },
    {
      h: "email",
      p1: "daralshifaa@gmail.com",
      p2: "daralfouad@gmail.com",
      icon: <BsEnvelopeAt />,
    },
    {
      h: "working hours",
      p1: "Mon-Sat 09:00-20:00",
      p2: "Sunday Emergency only",
      icon: <FaRegClock />,
    },
  ];
  return (
    <div
      className={
        isCantactPage
          ? "grid grid-cols-2 grid-rows-2 gap-2 "
          : "md:flex hidden justify-center items-center gap-10 pb-10 pt-20"
      }
    >
      {contactData.map((item, index) => (
        <div
          key={index}
          className="md:h-48 md:w-52 md:px-8 px-4 py-4 md:py-0 rounded text-start flex flex-col justify-center gap-3 bg-accent text-primary hover:bg-primary hover:text-accent"
        >
          <div className="md:text-4xl text-lg">{item.icon}</div>
          <h1 className="font-bold uppercase md:text-base text-xs">{item.h}</h1>
          <p className="md:text-xs text-[8px]">{item.p1}</p>
          <p className="md:text-xs text-[8px]">{item.p2}</p>
        </div>
      ))}
    </div>
  );
}
