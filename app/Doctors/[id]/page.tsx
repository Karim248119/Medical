"use client";
import { IMG_URL } from "@/api";
import AppointmentForm from "@/components/forms/AppointmentForm";
import UserLayout from "@/components/layout/UserLayout";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Doctor } from "@/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
function DoctorProfile() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (data) {
      setDoctor(JSON.parse(data));
    }
  }, [data]);

  if (!doctor) return <div>Loading...</div>;
  const workDays = [
    { day: "Monday", time: "09:00 AM - 05:00 PM" },
    { day: "Tuesday", time: "09:00 AM - 05:00 PM" },
    { day: "Wednesday", time: "09:00 AM - 05:00 PM" },
    { day: "Thursday", time: "09:00 AM - 05:00 PM" },
    { day: "Friday", time: "09:00 AM - 05:00 PM" },
    { day: "Saturday", time: "09:00 AM - 05:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];
  return (
    <UserLayout>
      <div className="grid md:grid-cols-6">
        <div className=" md:col-span-4 flex ">
          <div className="flex flex-col  w-full h-full md:p-10 p-4">
            <div
              className="h-[25vh] w-full rounded-t-lg relative"
              style={{
                backgroundImage: `url(https://wallpaperaccess.com/full/4113244.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src={IMG_URL + doctor.img}
                alt={doctor.name}
                className="md:h-40 h-28 aspect-square rounded-full mx-auto object-cover object-top absolute md:-bottom-20 -bottom-14 md:left-10 left-5 md:border-8 border-4 border-white"
              />
            </div>
            <div className="md:mt-24 md:ml-10 mt-16 ">
              <p className="md:text-4xl text-xl font-semibold font-serif text-primary ">
                {doctor.name}
              </p>
              <p className="md:text-base text-xs text-black/50 mt-2">
                {doctor.sp_id.title}
              </p>
            </div>
            <Tabs
              defaultValue="profile"
              className=" md:mt-14 mt-5 md:text-base text-xs"
            >
              <TabsList className="bg-accent w-full rounded-none md:hidden">
                <TabsTrigger value="profile">profile</TabsTrigger>
                <TabsTrigger value="certificate">certificate</TabsTrigger>
                <TabsTrigger value="appointment">appointment</TabsTrigger>
              </TabsList>
              <div className="md:flex gap-5  ">
                <TabsList className="bg-white rounded-none flex-col hidden md:flex gap-3 w-40 mt-12">
                  <TabsTrigger className="bg-accent w-full" value="profile">
                    profile
                  </TabsTrigger>
                  <TabsTrigger className="bg-accent w-full" value="certificate">
                    certificate
                  </TabsTrigger>
                  <TabsTrigger className="bg-accent w-full" value="appointment">
                    appointment
                  </TabsTrigger>
                </TabsList>
                <div className="w-full">
                  <TabsContent value="profile">{doctor.resume}</TabsContent>
                  <TabsContent value="certificate">
                    <img
                      src="https://professional.fromgrandma.best/wp-content/uploads/2020/01/28-doctorate-degree-certificate-template-doctorate-pertaining-to-doctorate-certificate-template-2048x1572.jpg"
                      alt="certificate"
                      className="w-full md:w-auto md:max-h-[50vh] "
                    />
                  </TabsContent>
                  <TabsContent value="appointment">
                    <AppointmentForm
                      doctor={doctor}
                      speciality={doctor.sp_id}
                    />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
        <div className=" md:col-span-2 flex md:justify-start justify-center h-[80vh] my-8 md:m-0">
          {/* <div className="bg-white md:p-10 pt-10">
            <div className="bg-primary text-white font-serif font-semibold text-center p-3 rounded-t">
              Booking Availability
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border "
              captionLayout="dropdown"
            />
          </div> */}
          <div className="bg-white md:p-10 ">
            <div className="bg-primary px-5 py-10 rounded-sm">
              <h2 className=" font-serif font-semibold text-accent md:text-3xl text-xl text-center">
                Schedule hours
              </h2>
              <div className="md:mt-10 mt-8">
                {workDays.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center mb-5 md:text-xs text-[10px]"
                  >
                    <div className="col-span-2 text-white">{item.day}</div>
                    <div className="col-span-1 w-6 md:h-[2px] h-[1px] bg-accent" />
                    <div className="col-span-2 text-white ">{item.time}</div>
                  </div>
                ))}
              </div>
              <div className="w-[80%] md:h-[2px] h-[1px] bg-accent m-auto my-6" />
              <div className="flex justify-center items-center gap-2">
                <MdOutlinePhoneInTalk className="text-4xl md:text-6xl text-accent" />
                <div className="flex flex-col">
                  <p className="text-white md:text-2xl text-lg">Emergency</p>
                  <p className="text-accent">(237) 681-812-255</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

import React from "react";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DoctorProfile />
    </Suspense>
  );
}
