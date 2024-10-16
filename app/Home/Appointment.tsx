import AppointmentForm from "@/components/forms/AppointmentForm";
import Header from "@/components/shared/Header";
import { IMGS } from "@/utilities/Image";
import React, { useState } from "react";

export default function Appointment() {
  return (
    <section id="appointment">
      <div
        className=" w-screen"
        style={{
          backgroundImage: `url(${IMGS.appBg.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full md:py-20 py-10 bg-white/80 grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 md:px-36 px-3">
          <div className=" flex flex-col justify-center gap-5 md:text-start text-center">
            <h2 className="font-serif md:text-4xl text-xl font-bold text-secondary ">
              Book an Appointment
            </h2>
            <p className=" leading-loose md:text-base text-sm">
              Schedule a consultation with our specialists at a time convenient
              for you. Our team is dedicated to providing personalized care and
              ensuring your health is our top priority. Fill in the form, and we
              will confirm your appointment shortly.
            </p>
          </div>
          <div className=" md:flex justify-center items-center ">
            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
