"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminLayout from "@/components/layout/AdminLayout";
import { useEffect, useState } from "react";
import { deleteNews, getAllNews } from "@/api/news";
import Link from "next/link";
import { News } from "@/types";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IMG_URL } from "@/api";
import DeleteBtn from "@/components/shared/DeleteBtn";

const NewsPage = () => {
  const [news, setNews] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getAllNews(query);
      setNews(response.data);
    };
    fetchNews();
  }, [query]);

  return (
    <AdminLayout title="News List">
      <div className="flex gap-5 mb-5">
        <Input
          placeholder="Search by title"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Link href="/admin/news/add">
          <Button className="capitalize text-white rounded-sm">Add News</Button>
        </Link>
      </div>

      {news.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news?.map((newsItem, index) => (
                <TableRow
                  key={newsItem._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={IMG_URL + newsItem.img}
                      alt={newsItem.title}
                      className="h-16 w-16 object-cover mx-auto"
                    />
                  </TableCell>
                  <TableCell>{newsItem.title}</TableCell>
                  <TableCell>
                    {new Date(newsItem.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={{
                          pathname: `news/update`,
                          query: { data: JSON.stringify(newsItem) },
                        }}
                      >
                        <Button
                          variant="secondary"
                          className="px-3 shadow rounded"
                        >
                          <FaEdit className="text-sm text-white" />
                        </Button>
                      </Link>

                      <form
                        action={`/news/delete/${newsItem._id}`}
                        method="POST"
                      >
                        <DeleteBtn
                          onClick={() => {
                            deleteNews(newsItem._id);
                          }}
                        />
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No news found.</p>
      )}
    </AdminLayout>
  );
};

export default NewsPage;
