"use client";
import UserLayout from "@/components/layout/UserLayout";
import SubHead from "@/components/shared/SubHead";
import { IMGS } from "@/utilities/Image";
import React, { useEffect, useState } from "react";
import { getAllServices } from "@/api/services";
import Loading from "@/components/Loading";
import ServiceCard from "@/components/cards/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAllServices();
      setServices(response.data);
      setLoading(false);
    };
    fetchServices();
  }, []);
  return (
    <UserLayout>
      <SubHead
        path="Home / Services"
        title="Our Services"
        img={IMGS.services3}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 md:w-2/3 w-[90%] mx-auto gap-5 md:mt-20 pb-5 mt-8">
          {services?.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      )}
    </UserLayout>
  );
}
