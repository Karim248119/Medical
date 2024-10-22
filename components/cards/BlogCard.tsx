import React from "react";

import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiCalendar, BiCategory, BiUser } from "react-icons/bi";
import { News } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { IMGS } from "@/utilities/Image";

export default function BlogCard({ news }: { news: News }) {
  return (
    <div className="flex flex-col md:gap-5 gap-1 items-center md:w-auto ">
      <div className="  w-full  ">
        {news?.image_url ? (
          <img
            src={news?.image_url}
            alt="news"
            className="w-full aspect-[2/1] rounded-sm object-cover "
          />
        ) : (
          <Image
            src={IMGS.healthNews}
            width={1000}
            height={1000}
            alt={news?.title}
            className="w-full aspect-[2/1] rounded-sm object-cover "
          />
        )}
      </div>
      <div className="flex flex-col md:gap-4 gap-2 md:text-base text-[8px] w-full">
        <div className="flex items-center md:gap-10 gap-5">
          <div className="flex items-center md:gap-1">
            <BiCalendar className="text-secondary md:text-xl" />
            <span className=" text-black md:text-[10px] text-[8px]">
              {news?.pubDate}
            </span>
          </div>
          <div className="flex items-center md:gap-1">
            <BiUser className="text-secondary md:text-xl" />
            <span className=" text-black md:text-[10px] text-[8px]">
              {news?.creator ? news?.creator : "unkown"}
            </span>
          </div>
        </div>
        <h2 className=" text-primary font-semibold font-serif md:text-xl text-sm">
          {news?.title}
        </h2>
        <p className="text-black/50 md:text-sm text-xs">
          {news?.description.replace(/<\/?p>/g, "").trim()}
        </p>
        <div className="flex gap-3 ">
          <Link href={news?.link}>
            <Button
              variant="outline"
              className="rounded-full md:text-base text-[8px] md:p-5 p-2 py-1"
            >
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
