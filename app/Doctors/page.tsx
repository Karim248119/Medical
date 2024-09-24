import SubHead from "@/components/shared/SubHead";
import React from "react";
import { DOCTORS } from "../Home";
import DocCard from "@/components/cards/DocCard";
import Quotes from "@/components/Quotes";
import News from "@/components/News";

export default function Doctors() {
  return (
    <div>
      <SubHead title="Our Doctors" />
      <div className="grid md:grid-cols-5 grid-cols-1 place-items-center gap-10 mt-10">
        {DOCTORS.map((doctor, index) => (
          <DocCard key={index} doctor={doctor} />
        ))}
      </div>
      <Quotes />
      <div className="mb-20">
        <News />
      </div>
    </div>
  );
}
