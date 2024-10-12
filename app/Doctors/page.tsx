"use client";
import SubHead from "@/components/shared/SubHead";
import React, { useEffect, useState } from "react";
import DocCard from "@/components/cards/DocCard";
import Quotes from "@/components/Quotes";
import News from "@/app/Home/News";
import UserLayout from "@/components/layout/UserLayout";
import { getAllDoctors } from "@/api/doctors";
import Loading from "@/components/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IMGS } from "@/utilities/Image";
import { getAllSpecialities } from "@/api/specialities";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Speciality } from "@/types";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await getAllSpecialities("");
        setSpecialities(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialities();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors(
          page,
          8,
          speciality === "all" ? "" : speciality,
          query
        );
        setDoctors(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page, speciality, query]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <UserLayout>
      <SubHead path="Home / Doctors" title="Our Doctors" img={IMGS.doctors} />
      <div className="md:w-1/2 w-[80vw] m-auto bg-primary rounded-full overflow-hidden flex  -mt-6 z-20 absolute left-1/2 -translate-x-1/2">
        <Select
          value={speciality}
          onValueChange={(value) => {
            setSpeciality(value);
          }}
        >
          <SelectTrigger className="md:w-[180px] w-[100px] rounded-none text-center border-0 border-r">
            <SelectValue placeholder="Speciality" className="text-center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"all"}>All</SelectItem>

            {specialities.map((speciality: Speciality, index) => (
              <SelectItem key={index} value={speciality._id as string}>
                {speciality.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-full bg-primary rounded flex items-center">
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" bg-primary flex flex-1  text-accent border-none"
          />
          <CiSearch className="md:mr-10 mr-4 text-accent text-3xl" />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center gap-10 mt-20 w-2/3 m-auto">
          {doctors.map((doctor, index) => (
            <DocCard key={index} doctor={doctor} />
          ))}
        </div>
      )}

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
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

      <Quotes />
      <div className="mb-20">
        <News />
      </div>
    </UserLayout>
  );
}
