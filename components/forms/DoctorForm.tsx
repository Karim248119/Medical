"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllSpecialities } from "@/api/specialities";
import { addDoctor, updateDoctor } from "@/api/doctors";
import { Doctor, Speciality } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const DoctorDorm = ({ doctor }: { doctor?: Doctor }) => {
  const [name, setName] = useState(doctor?.name || "");
  const [contacts, setContacts] = useState({
    phone: doctor?.contacts?.phone || "",
    facebook: doctor?.contacts?.facebook || "",
    instagram: doctor?.contacts?.instagram || "",
    linkedin: doctor?.contacts?.linkedin || "",
  });
  const [resume, setResume] = useState(doctor?.resume || "");
  const [img, setImg] = useState<File | null>(null);
  const [spId, setSpId] = useState(doctor?.sp_id?._id || "");
  const [loading, setLoading] = useState(false);
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  const [alert, setAlert] = useState<{
    show: boolean;
    type: "default" | "destructive";
    message: string;
  }>({
    show: false,
    type: "default",
    message: "",
  });

  useEffect(() => {
    const fetchSpecialities = async () => {
      const response = await getAllSpecialities();
      setSpecialities(response.data);
    };
    fetchSpecialities();
  }, []);

  const handleAlert = (type: "default" | "destructive", message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: "default", message: "" });
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("contacts.phone", contacts.phone);
    formData.append("contacts.facebook", contacts.facebook);
    formData.append("contacts.linkedin", contacts.linkedin);
    formData.append("contacts.instagram", contacts.instagram);
    formData.append("resume", resume);
    if (img) {
      formData.append("img", img);
    }
    formData.append("sp_id", spId);

    try {
      if (doctor) {
        const response = await updateDoctor(doctor._id, formData);
        if (response) {
          handleAlert("default", "Doctor updated successfully!");
        } else {
          handleAlert("destructive", "Error updating doctor.");
        }
      } else {
        const response = await addDoctor(formData);
        if (response) {
          handleAlert("default", "Doctor added successfully!");
          setName("");
        } else {
          handleAlert("destructive", "Error adding doctor.");
        }
      }
    } catch (error) {
      handleAlert("destructive", "An error occurred. Please try again.");
      console.error("Failed to add/update doctor", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {alert.show && (
        <Alert
          className={`mb-4 absolute bottom-10 right-10 w-1/3 ${
            alert.type === "default" ? "bg-green-500" : "bg-red-500"
          } text-white`}
          variant={alert.type}
        >
          <AlertTitle>
            {alert.type === "default" ? "Success!" : "Error!"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-primary text-white shadow-lg w-full md:w-2/3 mx-auto"
        encType="multipart/form-data"
      >
        {/* Name */}
        <div className="">
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 focus:outline-none bg-primary"
          />
        </div>

        <div className="grid grid-cols-2 ">
          {/* Image */}
          <div className="">
            <Input
              type="file"
              id="img"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImg(e.target.files[0]);
                }
              }}
              required
              className="w-full p-2 border border-gray-300  bg-primary"
            />
          </div>

          {/* Speciality */}
          <div className="">
            <select
              id="sp_id"
              value={spId || ""}
              onChange={(e) => setSpId(e.target.value)}
              required
              className="w-full p-2 bg-primary h-full border border-gray-300 focus:outline-none"
            >
              <option value="" disabled>
                Select a speciality
              </option>
              {/* Placeholder option */}
              {specialities?.map((sp: any, index) => (
                <option
                  className="bg-accent text-primary"
                  key={index}
                  value={sp._id}
                >
                  {sp.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-2 ">
          <Input
            type="text"
            placeholder="Phone"
            id="phone"
            value={contacts.phone}
            onChange={(e) =>
              setContacts({ ...contacts, phone: e.target.value })
            }
            required
            className="w-full p-2 border border-gray-300 focus:outline-none bg-primary"
          />
          <Input
            type="text"
            placeholder="Facebook"
            id="facebook"
            value={contacts.facebook}
            onChange={(e) =>
              setContacts({ ...contacts, facebook: e.target.value })
            }
            className="w-full p-2 border border-gray-300 focus:outline-none bg-primary"
          />
        </div>

        <div className="grid grid-cols-2  ">
          <Input
            type="text"
            placeholder="LinkedIn"
            id="linkedin"
            value={contacts.linkedin}
            onChange={(e) =>
              setContacts({ ...contacts, linkedin: e.target.value })
            }
            className="w-full p-2 border border-gray-300 focus:outline-none bg-primary"
          />
          <Input
            type="text"
            placeholder="Instagram"
            id="instagram"
            value={contacts.instagram}
            onChange={(e) =>
              setContacts({ ...contacts, instagram: e.target.value })
            }
            className="w-full p-2 border border-gray-300 focus:outline-none bg-primary"
          />
        </div>

        {/* Resume */}
        <textarea
          id="resume"
          placeholder="Resume"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          rows={4}
          required
          className="w-full p-2 border-t border-gray-300 focus:outline-none bg-primary"
        />
        <Button
          type="submit"
          className="bg-accent text-primary uppercase px-4 py-2 w-full hover:bg-secondary"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default DoctorDorm;
