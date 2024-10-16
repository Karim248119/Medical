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
import { deleteAppointment, getAllAppointments } from "@/api/appointment";
import Link from "next/link";
import { Appointment } from "@/types";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IMG_URL } from "@/api";
import DeleteBtn from "@/components/shared/DeleteBtn";

const Page = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchappointments = async () => {
      const response = await getAllAppointments("");
      setAppointments(response.data);
    };
    fetchappointments();
  }, [appointments]);
  return (
    <AdminLayout title="appointments List">
      {appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Speciality</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Cancel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment: Appointment, index) => (
                <TableRow
                  key={appointment._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{appointment?.date.split("T")[0]}</TableCell>
                  <TableCell>{appointment?.time}</TableCell>
                  <TableCell>{appointment.user?.name}</TableCell>
                  <TableCell>{appointment.speciality?.title}</TableCell>
                  <TableCell>Dr. {appointment.doctor?.name}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <form
                        action={`/appointments/delete/${appointment._id}`}
                        method="POST"
                      >
                        <DeleteBtn
                          onClick={() => {
                            deleteAppointment(appointment._id);
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
        <p>No appointments found.</p>
      )}
    </AdminLayout>
  );
};

export default Page;
