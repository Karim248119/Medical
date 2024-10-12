import React from "react";
import loading from "../public/assets/icons/ezgif-2-2ddacf57b7.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-[50vh] flex justify-center items-center">
      <Image src={loading} alt="Loading" width={300} height={300} />
    </div>
  );
}
