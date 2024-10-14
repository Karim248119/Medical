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
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  subject: z.string().min(2, {
    message: "Subject is required.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 5 characters.",
  }),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSending(true);
    setSuccess(null);
    setError(null);

    try {
      const templateParams = {
        to_name: "Medical",
        username: values.username,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };

      const response = await emailjs.send(
        "service_gfigj0p",
        "template_rj7speh",
        templateParams,
        "JTlpYoyrrGRpqcC0r"
      );

      if (response.status === 200) {
        setSuccess("Email sent successfully!");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      setError("Failed to send email. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
    }
  }, [success, error]);

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col text-white md:text-base text-xs h-full "
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
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Subject"
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
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <textarea
                    placeholder="Message"
                    className=" w-full h-full  p-3 bg-primary border-t border-x-[1px] focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-accent text-primary font-normal uppercase border-x-[1px]"
            type="submit"
            disabled={sending}
          >
            {sending ? "Sending..." : "Submit"}
          </Button>
        </form>
      </Form>
      <div className="fixed bottom-20 left-20 w-[40vw]">
        {success && (
          <Alert className="bg-green-500 text-white">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert className="bg-red-500  text-white" variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
