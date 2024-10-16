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
import { deleteService, getAllServices } from "@/api/services";
import Link from "next/link";
import { Service } from "@/types";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IMG_URL } from "@/api";
import DeleteBtn from "@/components/shared/DeleteBtn";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAllServices();
      setServices(response.data);
    };
    fetchServices();
  }, [services]);
  return (
    <AdminLayout title="Services List">
      <div className="flex gap-5 mb-5">
        <Input placeholder="Search by title" className=" " />
        <Link href="/admin/services/add">
          <Button className="capitalize text-white rounded-sm">
            Add Service
          </Button>
        </Link>
      </div>

      {services.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Vid</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service, index) => (
                <TableRow
                  key={service._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={IMG_URL + service.img}
                      alt={service.title}
                      className="h-16 w-16 object-cover mx-auto"
                    />
                  </TableCell>
                  <TableCell>
                    <img
                      src={IMG_URL + service.icon}
                      alt={service.title}
                      className="h-16 w-16 object-cover mx-auto"
                    />
                  </TableCell>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>{service.videoSrc}</TableCell>
                  <TableCell>{`${service.description?.substring(
                    0,
                    70
                  )}...`}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        href={{
                          pathname: `services/update`,
                          query: { data: JSON.stringify(service) },
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
                        action={`/services/delete/${service._id}`}
                        method="POST"
                      >
                        <DeleteBtn
                          onClick={() => {
                            deleteService(service._id);
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
        <p>No services found.</p>
      )}
    </AdminLayout>
  );
};

export default ServicesPage;
