"use client";

import { Suspense, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { addSpeciality, updateSpeciality } from "@/api/specialities";
import { useSearchParams } from "next/navigation";
import SpecialityForm from "@/components/forms/SpecialityForm";

const UpdateSpeciality = () => {
  const searchParams = useSearchParams();
  const speciality = JSON.parse(searchParams.get("data") ?? "{}");
  const [title, setTitle] = useState(speciality.title);
  const [img, setImg] = useState<File | null>(speciality.img);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    if (img) {
      formData.append("img", img);
    }

    try {
      const response = await updateSpeciality(speciality._id, formData);
      if (response) {
        window.alert("Speciality added successfully!");
        setTitle("");
        setImg(null);
      } else {
        window.alert("Error adding speciality.");
      }
    } catch (error) {
      window.alert("Failed to submit form.");
      console.error("Failed to submit form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New Speciality">
      <SpecialityForm speciality={speciality} />
    </AdminLayout>
  );
};

import React from "react";
import Loading from "@/components/Loading";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <UpdateSpeciality />
    </Suspense>
  );
}
