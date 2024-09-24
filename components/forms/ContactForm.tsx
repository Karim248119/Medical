"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectLabel,
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Define the schema with additional fields
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters.",
    })
    .max(15, {
      message: "Phone number must be at most 15 characters.",
    }),
});

export default function ContactForm() {
  const [date, setDate] = useState<Date>();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  return (
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
        </div>
        <FormField
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Subject"
                  className="rounded-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <textarea
          placeholder="Message"
          className=" w-full min-h-40 p-3 bg-primary border-x-[1px] focus:outline-none"
        />
        <Button
          className="w-full bg-accent text-primary font-normal uppercase border-x-[1px]"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
