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
import { deleteDoctor, getAllDoctors } from "@/api/doctors";
import Link from "next/link";
import { Doctor } from "@/types";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTrashCan,
} from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IMG_URL } from "@/api";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await getAllDoctors(1, 100, "", query);
      setDoctors(response.data);
    };
    fetchDoctors();
  }, [query]);

  return (
    <AdminLayout title="Doctors List">
      <div className="flex gap-5 mb-5">
        <Input
          placeholder="Search by name"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Link href="/admin/doctors/add">
          <Button className="capitalize text-white rounded-sm">
            Add Doctor
          </Button>
        </Link>
      </div>

      {doctors.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary ">
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Speciality</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor, index) => (
                <TableRow
                  key={doctor._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={IMG_URL + doctor.img}
                      alt={doctor.name}
                      className="h-16 w-16 object-cover object-top rounded-full mx-auto"
                    />
                  </TableCell>
                  <TableCell>{`Dr. ${doctor.name}`}</TableCell>
                  <TableCell>
                    {doctor.sp_id ? doctor.sp_id.title : "undefined"}
                  </TableCell>
                  {doctor.contacts ? (
                    <TableCell>{doctor.contacts.phone}</TableCell>
                  ) : (
                    <TableCell>-</TableCell>
                  )}
                  <TableCell>{`${doctor.resume.substring(
                    0,
                    40
                  )}...`}</TableCell>
                  {doctor.contacts ? (
                    <TableCell className="text-xl">
                      <div className="flex justify-center items-center gap-3">
                        {doctor.contacts.facebook && (
                          <a
                            href={doctor.contacts.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin className=" text-blue-600 " />
                          </a>
                        )}
                        {doctor.contacts.linkedin && (
                          <a
                            href={doctor.contacts.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebook className=" text-blue-700 " />
                          </a>
                        )}
                        {doctor.contacts.instagram && (
                          <a
                            href={doctor.contacts.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className=" text-pink-500 " />
                          </a>
                        )}
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell>-</TableCell>
                  )}

                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={{
                          pathname: `doctors/update`,
                          query: { data: JSON.stringify(doctor) },
                        }}
                      >
                        <Button
                          variant="secondary"
                          className="px-3 shadow rounded"
                        >
                          <FaEdit className=" text-sm  text-white" />
                        </Button>
                      </Link>

                      <form
                        action={`/doctors/delete/${doctor._id}`}
                        method="POST"
                      >
                        <Button
                          onClick={() => {
                            deleteDoctor(doctor._id);
                          }}
                          variant="destructive"
                          type="button"
                          className="px-3 shadow rounded"
                        >
                          <FaTrashCan className=" text-sm  text-white" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No doctors found.</p>
      )}
    </AdminLayout>
  );
};

export default DoctorsPage;
