import React from "react";

import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiCalendar, BiCategory, BiUser } from "react-icons/bi";
import { NewsArticle, Resource } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { IMGS } from "@/utilities/Image";

export default function BlogCard({ news }: { news: Resource }) {
  return (
    <div className="flex flex-col md:gap-5 gap-1 items-center md:w-auto ">
      <div className="  w-full  ">
        <img
          src={news.ImageUrl}
          alt="news"
          className="w-full aspect-[20/19] rounded-sm object-cover "
        />
      </div>
      <div className="flex flex-col md:gap-4 gap-2 md:text-base text-[8px] w-full">
        <div className="flex items-center md:gap-10 gap-5">
          <div className="flex items-center md:gap-2">
            <BiCategory className="text-secondary md:text-xl" />
            <span className=" text-black md:text-xs text-[8px]">
              {news.Categories}
            </span>
          </div>
          {/* <div className="flex items-center md:gap-2">
            <BiUser className="text-secondary md:text-xl" />
            <span className=" text-black">
              {news.LastUpdate ? news.LastUpdate : "unkown"}
            </span>
          </div> */}
        </div>
        <h2 className=" text-primary font-semibold font-serif md:text-xl text-sm">
          {news.Title}
        </h2>
        <p className="text-black/50 md:text-sm text-xs">
          {news.MyHFDescription.replace(/<\/?p>/g, "").trim()}
        </p>
        <div className="flex gap-3 ">
          <Link href={news.AccessibleVersion}>
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
