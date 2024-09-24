import React from "react";

import { FaRegEye, FaRegHeart } from "react-icons/fa";

interface news {
  id: number;
  title: string;
  description: string;
  date: string;
  img: string;
  reacts: number;
  views: number;
}

export default function NewsCard({ news }: { news: news }) {
  return (
    <div className="flex md:gap-5 gap-2 items-center">
      <div className=" w-1/3 md:h-32 h-24 overflow-hidden rounded-l-lg">
        <img src={news.img} className=" w-full h-full " />
      </div>
      <div className="flex flex-col gap-4 md:text-xs text-[8px] w-2/3">
        <span className=" text-secondary">{news.date}</span>
        <h2 className="md:text-base text-xs">{news.title}</h2>
        <div className="flex gap-3 ">
          <div className="flex items-center gap-1">
            <FaRegEye className="text-primary" />
            <span>{news.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegHeart className="text-red-500" />
            <span>{news.reacts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
