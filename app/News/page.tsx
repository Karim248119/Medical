"use client";
import BlogCard from "@/components/cards/BlogCard";
import UserLayout from "@/components/layout/UserLayout";
import Loading from "@/components/Loading";
import SubHead from "@/components/shared/SubHead";
import { Input } from "@/components/ui/input";
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
import { NEWS_API_KEY } from "@/api";
import { News } from "@/types";
import { useDebounce } from "use-debounce";

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(
    "1729528200053930440"
  );
  const [pageHistory, setPageHistory] = useState<string[]>([]);

  const [debouncedQuery] = useDebounce(query, 500);

  const API_URL = `https://newsdata.io/api/1/latest?apikey=pub_569666be30748bb062f08ac773670ca76d0d2&category=health&q=${
    query || "general"
  }`;

  const fetchData = async (pageToken: string | null) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.results) {
        setNews(data.results);
        setPageHistory((prev) => [...prev, nextPage || "1729528200053930440"]);

        setNextPage(data.nextPage || null);
      } else {
        console.log("No news data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(nextPage);
  }, [page, debouncedQuery]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (newPage: number, pageToken: string | null) => {
    setPage(newPage);
    fetchData(pageToken);
  };

  const handlePrevPage = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      const prevPageToken = newHistory[newHistory.length - 1];

      setPageHistory(newHistory);
      setPage(page - 1);
      fetchData(prevPageToken);
    }
  };

  return (
    <UserLayout>
      <SubHead path="Home / News" title="Blog Posts" img={IMGS.news} />
      <div className="md:w-1/2 w-[80vw] m-auto bg-primary rounded-full overflow-hidden flex items-center gap-5 -mt-6 z-20 absolute left-1/2 -translate-x-1/2">
        <Input
          placeholder="Search"
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
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem className="flex items-center">
            <PaginationPrevious onClick={handlePrevPage} disabled={page <= 1} />
          </PaginationItem>

          <PaginationItem>
            <div>{page}</div>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => nextPage && handlePageChange(page + 1, nextPage)}
              disabled={!nextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </UserLayout>
  );
}
