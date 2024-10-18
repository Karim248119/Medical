"use client";
import BlogCard from "@/components/cards/BlogCard";
import UserLayout from "@/components/layout/UserLayout";
import Loading from "@/components/Loading";
import SubHead from "@/components/shared/SubHead";
import { Input } from "@/components/ui/input";
import { IMGS } from "@/utilities/Image";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function HealthFinder() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const API_URL = `https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=${age}&sex=${gender}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.Result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <UserLayout>
      <SubHead path="Home / News" title="Blog Posts" img={IMGS.news} />
      <div className="md:w-1/2 w-[80vw] m-auto bg-primary rounded-full overflow-hidden flex items-center gap-5 -mt-6 z-20 absolute left-1/2 -translate-x-1/2">
        <Input
          placeholder="Search "
          className="rounded bg-primary text-accent border-none"
        />
        <CiSearch className="mr-4 h-10 text-accent text-3xl" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="md:w-2/3 w-[85vw] grid md:grid-cols-2 md:gap-32 gap-10 my-16 m-auto">
          {data.Resources?.all?.Resource?.map((resource: any) => (
            <BlogCard key={resource.Id} news={resource} />
          ))}
        </div>
      )}
    </UserLayout>
  );
}
