"use client";
import BlogCard from "@/components/cards/BlogCard";
import NewsCard from "@/components/cards/NewsCard";
import UserLayout from "@/components/layout/UserLayout";
import Loading from "@/components/Loading";
import SubHead from "@/components/shared/SubHead";
import { Input } from "@/components/ui/input";
import { NewsArticle } from "@/types";
import { IMGS } from "@/utilities/Image";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPge] = useState(1);

  const NEWS_API = `https://newsapi.org/v2/top-headlines?q=${query}&category=health&page=${page}&apiKey=0b4931e434024a13940b07eb5df2ab99`;
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
  }, [query]);
  return (
    <UserLayout>
      <SubHead path="Home / News" title="Blog Posts" img={IMGS.news} />
      <div className="md:w-1/2 w-[80vw] m-auto bg-primary rounded-full overflow-hidden flex items-center gap-5 -mt-6 z-20 absolute left-1/2 -translate-x-1/2">
        <Input
          placeholder="Search "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded bg-primary text-accent border-none"
        />
        <CiSearch className="mr-4 h-10 text-accent text-3xl" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="md:w-2/3  w-[85vw] grid md:grid-cols-2 md:gap-32 gap-10 my-16 m-auto">
          {news.map((item, index) => (
            <BlogCard key={index} news={item} />
          ))}
        </div>
      )}
    </UserLayout>
  );
}
