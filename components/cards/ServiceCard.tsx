import { IMG_URL } from "@/api";
import { Service } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white shadow-lg">
      <img src={IMG_URL + service.img} className="aspect-square object-cover" />
      <div className="p-4 flex-col flex">
        <h2 className="md:text-xl text-base font-semibold text-primary capitalize mb-2 md:mb-4">
          {service.title}
        </h2>
        <p className="text-black/80 md:text-sm text-xs mb-0 md:mb-3">{`${service.description?.substring(
          0,
          130
        )}...`}</p>
        <Link
          href={{
            pathname: `/Services/${service._id}`,
            query: { data: JSON.stringify(service) },
          }}
        >
          <Button
            variant="link"
            className="self-start px-0 text-secondary gap-1"
          >
            Learn More <FaArrowRight className="text-primary" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
