import React from "react";
import { NEWS } from "../app/Home/index";
import NewsCard from "@/components/cards/NewsCard";
import Header from "@/components/shared/Header";

export default function News() {
  return (
    <div className="">
      <Header
        title="News"
        subtitle="Better information, Better health"
        className="py-20"
      />
      <div className="grid md:grid-rows-2 md:grid-cols-2  md:px-20 px-3 md:gap-10 gap-5">
        {NEWS.map((item, index) => (
          <NewsCard key={index} news={item} />
        ))}
      </div>
    </div>
  );
}
