"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getAllSpecialities } from "@/api/specialities";
import { getAllDoctors } from "@/api/doctors";
import { Appointment, Doctor, Speciality } from "@/types";
import { useAuth } from "@/context/authContext";
import { createAppointment } from "@/api/appointment";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { getAllAppointments } from "@/api/appointment";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." })
    .max(15, { message: "Phone number must be at most 15 characters." }),
  message: z.string().optional(),
  time: z.string(),
  gender: z.string(),
});

const Times = [
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
];

export default function AppointmentForm({
  doctor,
  speciality,
}: {
  doctor?: Doctor;
  speciality?: { _id: string; title: string };
}) {
  const [date, setDate] = useState<Date>();
  const { user } = useAuth();
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [selectedSpecialityId, setSelectedSpecialityId] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleAlert = (type: "success" | "error", message: string) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({
        show: false,
        type: "success",
        message: "",
      });
    }, 3000);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      message: "",
      time: "",
      gender: "",
    },
  });

  useEffect(() => {
    if (!speciality) {
      getAllSpecialities("").then((response) => setSpecialities(response.data));
    }
  }, [speciality]);

  useEffect(() => {
    if (!doctor && selectedSpecialityId) {
      getAllDoctors(1, 100, selectedSpecialityId, "").then((response) =>
        setDoctors(response.data)
      );
    }
  }, [selectedSpecialityId, doctor]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAllAppointments(doctor?._id);
      setAppointments(response.data);
    };
    if (doctor?._id) {
      fetchAppointments();
    }
  }, [doctor]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!date || !user) return;

    const formData = {
      name: values.username,
      gender: values.gender,
      email: values.email,
      phone: values.phone,
      date: date.toISOString(),
      time: values.time,
      message: values.message,
      doctor: doctor?._id || selectedDoctor,
      user: user._id,
      speciality: speciality?._id || selectedSpecialityId,
    };

    const result = await createAppointment(formData as any);
    if (result) {
      handleAlert("success", "Appointment created successfully!");
      form.reset();
    } else {
      handleAlert("error", "Some thing went wrong");
    }
  };

  return (
    <div className="relative">
      {alert.show && (
        <Alert
          className={`mb-4 fixed bottom-10 left-10 w-1/3 ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <AlertTitle>gchg</AlertTitle>
          <AlertDescription>hbjhbjhbjhbhj</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          className="flex flex-col text-white md:text-base text-xs"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-2 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      className="rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      className="rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!doctor && (
              <>
                <Select
                  onValueChange={(value) => {
                    const selectedSpeciality = specialities.find(
                      (item) => item.title === value
                    );
                    setSelectedSpecialityId(selectedSpeciality?._id || "");
                  }}
                >
                  <SelectTrigger className="bg-primary">
                    <SelectValue placeholder="Speciality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {specialities.map((item, index) => (
                        <SelectItem key={index} value={item.title}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value) => {
                    const selected = doctors.find((doc) => doc.name === value);
                    setSelectedDoctor(selected?._id || "");
                  }}
                >
                  <SelectTrigger className="bg-primary">
                    <SelectValue placeholder="Doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {doctors.map((item, index) => (
                        <SelectItem key={index} value={item.name}>
                          Dr. {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"default"}
                  className={cn(
                    "justify-start text-left font-normal border-[1px]",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Time " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {date &&
                            Times.filter(
                              (time) =>
                                !appointments.some(
                                  (appointment) =>
                                    appointment.time === time &&
                                    appointment.date === date?.toISOString()
                                )
                            ).map((time, index) => (
                              <SelectItem key={index} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex ">
                <FormControl>
                  <textarea
                    placeholder="Message (Optional)"
                    className="rounded-none flex flex-1 p-3 border outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!user}
            className="bg-accent text-primary"
            type="submit"
          >
            Book Appointment
          </Button>
        </form>
      </Form>
    </div>
  );
}
