"use client";

import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/layout/AdminLayout";
import { addSpeciality } from "@/api/specialities";
import { useSearchParams } from "next/navigation";
import SpecialityForm from "@/components/forms/SpecialityForm";

const AddSpeciality = () => {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState<File | null>(null);
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
      const response = await addSpeciality(formData);
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
      <SpecialityForm />
    </AdminLayout>
  );
};

import React from "react";
import Loading from "@/components/Loading";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <AddSpeciality />
    </Suspense>
  );
}
