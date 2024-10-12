"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addSpeciality, updateSpeciality } from "@/api/specialities";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Speciality } from "@/types";

type AlertType = "success" | "error" | null;

const SpecialityForm = ({ speciality }: { speciality?: Speciality }) => {
  const [title, setTitle] = useState(speciality?.title || "");
  const [img, setImg] = useState<File | null>(null);
  const [description, setDescription] = useState<string>(
    speciality?.description || ""
  );
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (img) {
      formData.append("img", img);
    }

    try {
      let response;
      if (speciality) {
        response = await updateSpeciality(speciality._id, formData);
        if (response) {
          setAlert({
            type: "success",
            message: "Speciality updated successfully!",
          });
        }
      } else {
        response = await addSpeciality(formData);
        if (response) {
          setTitle("");
          setImg(null);
          setAlert({
            type: "success",
            message: "Speciality added successfully!",
          });
        }
      }

      if (!response) {
        setAlert({
          type: "error",
          message: `Error ${speciality ? "updating" : "adding"} speciality.`,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `Failed to ${speciality ? "update" : "add"} speciality.`,
      });
      console.error("Failed to submit form", error);
    } finally {
      setLoading(false);
    }
  };

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(20, {
      message: "Description must be at least 20 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="bg-primary text-white shadow-lg w-full md:w-1/2 mx-auto"
      >
        {alert && (
          <Alert
            className={`mb-4 absolute bottom-10 right-10 w-1/3 ${
              alert.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {alert.type === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {alert.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        {/* Title Input */}
        <Input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 focus:outline-none bg-primary"
        />
        {/* Image Input */}
        <Input
          type="file"
          id="img"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImg(e.target.files[0]);
            }
          }}
          className="w-full p-2 border border-gray-300  bg-primary"
        />
        {/* des */}
        <textarea
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="w-full p-2 border-t border-gray-300 focus:outline-none bg-primary"
        />{" "}
        {/* Submit Button */}
        <div className="text-right">
          <Button
            type="submit"
            className="bg-accent text-primary uppercase px-4 py-2 w-full hover:bg-secondary"
            disabled={loading}
          >
            {loading ? "Submitting..." : speciality ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SpecialityForm;
