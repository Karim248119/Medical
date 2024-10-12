import React, { useEffect, useState } from "react";
import NewsCard from "@/components/cards/NewsCard";
import Header from "@/components/shared/Header";
import { NEWS_API } from "@/api";
import { NewsArticle } from "@/types";
import Loading from "@/components/Loading";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_API);
        const data = await response.json();
        const filteredNews = data.articles.filter(
          (article: NewsArticle) =>
            article.title !== "[Removed]" &&
            article.description !== "[Removed]" &&
            article.source.name !== "[Removed]"
        );
        setNews(filteredNews);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
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
        <div className="grid md:grid-rows-2 md:grid-cols-2  md:px-20 px-3 md:gap-10 gap-5">
          {news.slice(0, 4).map((item, index) => (
            <NewsCard key={index} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}
