import React from "react";

import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiCalendar, BiCategory } from "react-icons/bi";
import { News } from "@/types";
import Link from "next/link";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";

export default function NewsCard({ news }: { news: News }) {
  return (
    <div className="flex md:gap-5 gap-2 items-center justify-center md:w-auto w-[90vw] mx-auto">
      <div className=" h-full w-2/5  flex-1 overflow-hidden rounded-l-lg">
        <img
          src={news.image_url}
          alt="news"
          className=" aspect-[20/19] w-full object-cover scale-x-[-1]"
        />
      </div>
      <div className="flex h-full md:py-2 flex-col justify-between  md:text-base text-[8px] w-3/5">
        <div className="flex  items-center gap-2">
          <BiCalendar className="text-primary" />
          <span className=" text-secondary md:text-xs text-[8px]">
            {news.pubDate}
          </span>
        </div>
        <h2 className=" text-primary font-semibold font-serif">{news.title}</h2>
        <p className="text-black/50 md:text-base">
          {`${news.description
            .replace(/<\/?p>/g, "")
            .trim()
            .substring(0, 80)}...`}
        </p>
        <div className="flex justify-self-end gap-3 ">
          <Link href={news.link}>
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
