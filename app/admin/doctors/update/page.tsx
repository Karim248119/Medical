"use client";
import DoctorForm from "@/components/forms/DoctorForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "@/components/Loading";

const DoctorPage = () => {
  const searchParams = useSearchParams();
  const doctor = JSON.parse(searchParams.get("data") ?? "{}");

  return (
    <AdminLayout title="Update Doctor">
      <DoctorForm doctor={doctor} />
    </AdminLayout>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DoctorPage />
    </Suspense>
  );
}
