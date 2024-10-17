import React from "react";

import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiCalendar, BiUser } from "react-icons/bi";
import { NewsArticle } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { IMGS } from "@/utilities/Image";

export default function BlogCard({ news }: { news: NewsArticle }) {
  return (
    <div className="flex flex-col md:gap-5 gap-1 items-center md:w-auto ">
      <div className="  w-full md:h-[40vh] h-[30vh] ">
        {!news.urlToImage ? (
          <Image
            alt="news"
            width={1000}
            height={1500}
            src={IMGS.healthNews}
            className=" w-full h-full rounded-sm object-cover "
          />
        ) : (
          <img
            src={news.urlToImage}
            alt="news"
            className=" w-full h-full rounded-sm object-cover "
          />
        )}
      </div>
      <div className="flex flex-col md:gap-4 gap-2 md:text-base text-[8px] w-full">
        <div className="flex items-center md:gap-10 gap-5">
          <div className="flex items-center md:gap-2">
            <BiCalendar className="text-primary md:text-xl" />
            <span className=" text-black">{news.publishedAt}</span>
          </div>
          <div className="flex items-center md:gap-2">
            <BiUser className="text-secondary md:text-xl" />
            <span className=" text-black">
              {news.author ? news.author : "unkown"}
            </span>
          </div>
        </div>
        <h2 className=" text-primary font-semibold font-serif md:text-xl text-sm">
          {news.title}
        </h2>
        <p className="text-black/50 md:text-base">{news.description}</p>
        <div className="flex gap-3 ">
          <Link href={news.url}>
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
