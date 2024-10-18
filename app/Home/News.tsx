import React, { useEffect, useState } from "react";
import NewsCard from "@/components/cards/NewsCard";
import Header from "@/components/shared/Header";
import { NewsArticle, Resource } from "@/types";
import Loading from "@/components/Loading";

export default function News() {
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://health.gov/myhealthfinder/api/v3/myhealthfinder.json`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setNews(result.Result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <Header
        title="News"
        subtitle="Better information, Better health"
        className="py-20"
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid md:grid-rows-2 md:grid-cols-2 md:px-20 px-3 md:gap-10 gap-5">
          {news.Resources?.all?.Resource?.slice(0, 4).map((item: any) => (
            <NewsCard key={item.Id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}
