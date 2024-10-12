import Contact from "@/components/Contact";
import ContactForm from "@/components/forms/ContactForm";
import UserLayout from "@/components/layout/UserLayout";
import SubHead from "@/components/shared/SubHead";
import { IMGS } from "@/utilities/Image";
import React from "react";

export default function page() {
  return (
    <UserLayout noContact={true}>
      <SubHead path="Home / Contact" title="Contact us" img={IMGS.contact} />
      <div className="py-10 md:px-52 px-4">
        <div className="flex flex-col md:flex-row  gap-5 mb-12">
          <div className="flex-1 ">
            <ContactForm />
          </div>
          <div className="flex md:justify-end">
            <Contact isCantactPage={true} />
          </div>
        </div>
        <div className="flex justify-center items-center h-72 md:h-[50vh] border-4 border-x-accent border-y-primary">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387760.8972538484!2d-74.25819379552928!3d40.705825113365805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f0839%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1587382625221!5m2!1sen!2suk"
            width="100%"
            height="100%"
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </UserLayout>
  );
}
