import React, { useEffect, useState } from "react";
import NewsCard from "@/components/cards/NewsCard";
import Header from "@/components/shared/Header";
import Loading from "@/components/Loading";

export default function News() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `https://newsdata.io/api/1/latest?apikey=pub_569666be30748bb062f08ac773670ca76d0d2&category=health`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.results) {
          setNews(data.results);
        } else {
          console.log("No news data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
          {news.length > 0 ? (
            news
              .slice(0, 4)
              .map((item) => <NewsCard key={item.id} news={item} />)
          ) : (
            <div>No news available</div>
          )}
        </div>
      )}
    </div>
  );
}
