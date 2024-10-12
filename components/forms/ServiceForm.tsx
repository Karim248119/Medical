"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addService, updateService } from "@/api/services";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Service } from "@/types";

type AlertType = "success" | "error" | null;

const ServiceForm = ({ service }: { service?: Service }) => {
  const [title, setTitle] = useState(service?.title || "");
  const [img, setImg] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>(service?.videoSrc || "");
  const [description, setDescription] = useState<string>(
    service?.description || ""
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
    formData.append("videoSrc", videoSrc);
    if (img) {
      formData.append("img", img);
    }
    if (icon) {
      formData.append("icon", icon);
    }

    try {
      let response;
      if (service) {
        response = await updateService(service._id, formData);
        if (response) {
          setAlert({
            type: "success",
            message: "Service updated successfully!",
          });
        }
      } else {
        response = await addService(formData);
        if (response) {
          setTitle("");
          setImg(null);
          setIcon(null);
          setVideoSrc("");
          setAlert({
            type: "success",
            message: "Service added successfully!",
          });
        }
      }

      if (!response) {
        setAlert({
          type: "error",
          message: `Error ${service ? "updating" : "adding"} service.`,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `Failed to ${service ? "update" : "add"} service.`,
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
    videoSrc: z.string().url({
      message: "Video source must be a valid URL.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoSrc: "",
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
        {/* Icon Input */}
        <Input
          type="file"
          accept="image/*"
          placeholder="Add icon"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setIcon(e.target.files[0]);
            }
          }}
          className="w-full p-2 border border-gray-300 bg-primary"
        />
        {/* Video Source Input */}
        <Input
          type="text"
          id="videoSrc"
          placeholder="Video Source URL"
          value={videoSrc}
          onChange={(e) => setVideoSrc(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 focus:outline-none bg-primary"
        />
        {/* Description Textarea */}
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          className="w-full p-2 border-t border-gray-300 focus:outline-none bg-primary"
        />
        {/* Submit Button */}
        <div className="text-right">
          <Button
            type="submit"
            className="bg-accent text-primary uppercase px-4 py-2 w-full hover:bg-secondary"
            disabled={loading}
          >
            {loading ? "Submitting..." : service ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
