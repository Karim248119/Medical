import React from "react";

import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiCalendar } from "react-icons/bi";
import { NewsArticle } from "@/types";
import Link from "next/link";
import { IMGS } from "@/utilities/Image";
import Image from "next/image";

export default function NewsCard({ news }: { news: NewsArticle }) {
  return (
    <div className="flex md:gap-5 gap-2 items-center md:w-auto w-[90vw]">
      <div className=" h-full w-1/3  flex-1 overflow-hidden rounded-l-lg">
        {!news.urlToImage ? (
          <Image
            alt="news"
            width={1000}
            height={1500}
            src={IMGS.healthNews}
            className=" w-full h-full object-cover "
          />
        ) : (
          <img
            src={news.urlToImage}
            alt="news"
            className=" w-full h-full object-cover "
          />
        )}

        <div>{news.urlToImage}</div>
      </div>
      <div className="flex flex-col gap-4 md:text-base text-[8px] w-2/3">
        <div className="flex  items-center gap-2">
          <BiCalendar className="text-primary" />
          <span className=" text-secondary">{news.publishedAt}</span>
        </div>
        <h2 className=" text-primary font-semibold font-serif">{news.title}</h2>
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
