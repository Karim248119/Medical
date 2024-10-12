"use client";
import DoctorDorm from "@/components/forms/DoctorForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const searchParams = useSearchParams();
  const doctor = JSON.parse(searchParams.get("data") ?? "{}");
  return (
    <AdminLayout title="update doctor">
      <DoctorDorm doctor={doctor} />
    </AdminLayout>
  );
};

export default page;
