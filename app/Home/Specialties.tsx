import Header from "@/components/shared/Header";
import React, { useEffect, useState } from "react";
import { Speciality } from "@/types";
import { getAllSpecialities } from "@/api/specialities";
import { IMG_URL } from "@/api";
import Link from "next/link";
import Loading from "@/components/Loading";

export default function Specialties() {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialities = async () => {
      const response = await getAllSpecialities("");
      setSpecialities(response.data);
      setLoading(false);
    };
    fetchSpecialities();
  }, [specialities]);
  return (
    <section className="-mb-20" id="Specialities">
      <Header
        subtitle="Always Caring"
        title="Our Specialties"
        className="mb-8"
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-2 md:grid-rows-4  md:px-40">
          {specialities.map((item, index) => (
            <Link
              href={{
                pathname: "/Specialties",
                query: { data: JSON.stringify(item) },
              }}
              key={index}
              className="border-[1px] py-6 flex flex-col justify-center items-center gap-4 hover:bg-primary hover:text-accent duration-300"
            >
              <img
                src={IMG_URL + item.img}
                alt={item.title}
                className="h-14 w-14"
              />
              <p className="md:text-base text-xs">{item.title}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
