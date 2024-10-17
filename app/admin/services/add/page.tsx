"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/layout/AdminLayout";
import { addService } from "@/api/services";
import { useSearchParams } from "next/navigation";
import ServiceForm from "@/components/forms/ServiceForm";

const Page = () => {
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
      const response = await addService(formData);
      if (response) {
        window.alert("Service added successfully!");
        setTitle("");
        setImg(null);
      } else {
        window.alert("Error adding service.");
      }
    } catch (error) {
      window.alert("Failed to submit form.");
      console.error("Failed to submit form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New Service">
      <ServiceForm />
    </AdminLayout>
  );
};

export default Page;
