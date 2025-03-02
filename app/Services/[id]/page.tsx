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
import React, { Suspense, useEffect, useState } from "react";

function ServicePage() {
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
        <div className="md:w-2/3 px-5 md:px-0 mx-auto  md:grid grid-cols-4 gap-10 pt-8 md:pt-20 pb-8 md:pb-0">
          <div className="col-span-1">
            <div className=" grid grid-cols-2 md:grid-cols-1 mb-5 md:mb-0">
              {services?.map((item: Service, index) => (
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
                      src={IMG_URL + item.webIcon}
                      alt={item.title}
                      className="md:h-10 h-5 aspect-square mx-auto"
                    />
                  </div>
                  <p className="w-2/3 capitalize md:text-base text-xs">
                    {item.title}
                  </p>
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
              <h2 className="font-serif text-primary font-semibold md:text-4xl text-3xl mb-4">
                {service.title || "Service Title"}
              </h2>
              <p className="text-black/80 leading-8 text-base md:text-xs">
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

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <ServicePage />
    </Suspense>
  );
}
