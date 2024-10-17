import DoctorDorm from "@/components/forms/DoctorForm";
import AdminLayout from "@/components/layout/AdminLayout";
import React from "react";

export default function Page() {
  return (
    <AdminLayout title="add new doctor">
      <DoctorDorm />
    </AdminLayout>
  );
}
