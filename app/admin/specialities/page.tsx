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
import { deleteSpeciality, getAllSpecialities } from "@/api/specialities";
import Link from "next/link";
import { Speciality } from "@/types";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IMG_URL } from "@/api";
import DeleteBtn from "@/components/shared/DeleteBtn";

const SpecialitiesPage = () => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchSpecialities = async () => {
      const response = await getAllSpecialities(query);
      setSpecialities(response.data);
    };
    fetchSpecialities();
  }, [query]);
  return (
    <AdminLayout title="Specialities List">
      <div className="flex gap-5 mb-5">
        <Input
          placeholder="Search by title"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Link href="/admin/specialities/add">
          <Button className="capitalize text-white rounded-sm">
            Add Speciality
          </Button>
        </Link>
      </div>

      {specialities.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialities.map((speciality, index) => (
                <TableRow
                  key={speciality._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={IMG_URL + speciality.img}
                      alt={speciality.title}
                      className="h-16 w-16 object-cover mx-auto"
                    />
                  </TableCell>
                  <TableCell>{speciality.title}</TableCell>
                  <TableCell>{`${speciality.description?.substring(
                    0,
                    70
                  )}...`}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={{
                          pathname: `specialities/update`,
                          query: { data: JSON.stringify(speciality) },
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
                        action={`/specialities/delete/${speciality._id}`}
                        method="POST"
                      >
                        <DeleteBtn
                          onClick={() => {
                            deleteSpeciality(speciality._id);
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
        <p>No specialities found.</p>
      )}
    </AdminLayout>
  );
};

export default SpecialitiesPage;
