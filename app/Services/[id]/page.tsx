"use client";

import { IMG_URL } from "@/api";
import { getAllServices } from "@/api/services";
import UserLayout from "@/components/layout/UserLayout";
import Loading from "@/components/Loading";
import SubHead from "@/components/shared/SubHead";
import YouTubePlayer from "@/components/VideoPlayer";
import { Service } from "@/types";
import { IMGS } from "@/utilities/Image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ServicePage() {
  const searchParams = useSearchParams();
  const service: Service = JSON.parse(searchParams.get("data") ?? "{}");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const pathName = usePathname();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <UserLayout>
      <SubHead
        path="Home / Services"
        title={`${service.title}`}
        img={IMGS.services3}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-2/3 mx-auto mt-20 grid grid-cols-4 gap-10">
          <div className="col-span-1">
            <div>
              {services.map((item: Service, index) => (
                <Link
                  href={{
                    pathname: `/Services/${item._id}`,
                    query: { data: JSON.stringify(item) },
                  }}
                  key={index}
                  className={`border flex justify-center items-center p-3 hover:bg-primary hover:text-accent duration-300
                    ${
                      pathName === `/Services/${item._id}` &&
                      "bg-primary text-accent"
                    }
                    `}
                >
                  <div className="w-1/3">
                    <img
                      src={IMG_URL + item.icon}
                      alt={item.title}
                      className="h-10 aspect-square mx-auto"
                    />
                  </div>
                  <p className="w-2/3 capitalize">{item.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-3">
            {service.videoSrc ? (
              <YouTubePlayer videoId={service.videoSrc} />
            ) : (
              <p>No video available for this service.</p>
            )}
            <div className="mt-8">
              <h2 className="font-serif text-primary font-semibold text-4xl mb-4">
                {service.title || "Service Title"}
              </h2>
              <p className="text-black/80 leading-8">
                {service.description ||
                  "No description available for this service."}
              </p>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
