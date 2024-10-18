"use client";
import BlogCard from "@/components/cards/BlogCard";
import UserLayout from "@/components/layout/UserLayout";
import Loading from "@/components/Loading";
import SubHead from "@/components/shared/SubHead";
import { Input } from "@/components/ui/input";
import { NewsArticle } from "@/types";
import { IMGS } from "@/utilities/Image";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const NEWS_API = `https://newsapi.org/v2/top-headlines?q=${query}&category=health&page=${page}&apiKey=0b4931e434024a13940b07eb5df2ab99`;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(NEWS_API);
        const data = await response.json();

        const filteredNews = Array.isArray(data.articles)
          ? data.articles.filter(
              (article: NewsArticle) =>
                article.title !== "[Removed]" &&
                article.description !== "[Removed]" &&
                article.source.name !== "[Removed]"
            )
          : [];

        setNews(filteredNews);
        setTotalPages(Math.ceil(data.totalResults / 20));
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
        <div className="md:w-2/3 w-[85vw] grid md:grid-cols-2 md:gap-32 gap-10 my-16 m-auto">
          {news.map((item, index) => (
            <BlogCard key={index} news={item} />
          ))}
        </div>
      )}

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent className="flex flex-wrap">
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className="rounded"
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={index + 1 === page}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </UserLayout>
  );
}
