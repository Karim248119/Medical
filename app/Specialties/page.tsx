"use client";
import { IMG_URL } from "@/api";
import { getAllDoctors } from "@/api/doctors";
import DocCard from "@/components/cards/DocCard";
import UserLayout from "@/components/layout/UserLayout";
import Loading from "@/components/Loading";
import Header from "@/components/shared/Header";
import SubHead from "@/components/shared/SubHead";
import { Doctor, Speciality } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const speciality: Speciality = JSON.parse(searchParams.get("data") ?? "{}");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await getAllDoctors(1, 100, speciality._id, "");
      setDoctors(response.data);
      setLoading(false);
    };
    fetchDoctors();
  }, []);
  return (
    <UserLayout noContact={true}>
      <SubHead path="Home / Specialities" title={`${speciality.title}`} />
      <div className="p-20 flex gap-5 justify-center">
        <img src={IMG_URL + speciality.img} className="h-20 w-20" />
        <p className="w-2/3 space-y-5 leading-9 text-lg text-black/60">
          {speciality.description}
        </p>
      </div>
      <div className="mb-10">
        <Header subtitle="trusted care" title="Our Doctors" className="mb-10" />
        {loading ? (
          <Loading />
        ) : (
          <div className=" w-screen flex justify-center gap-5">
            {doctors.map((doctor, index) => (
              <DocCard key={index} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
