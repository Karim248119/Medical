import UserLayout from "@/components/layout/UserLayout";
import SubHead from "@/components/shared/SubHead";
import React from "react";

export default function About() {
  return (
    <UserLayout>
      <SubHead path="Home / About" title="About us" />
      <div className="min-h-screen flex flex-col items-center justify-center  py-10">
        <div className="max-w-4xl w-full md:text-lg text-sm p-8">
          <p className="text-gray-700  md:mb-16 mb-8">
            Welcome to our hospital! We are committed to providing the highest
            quality of healthcare to our patients and the community. Our team of
            dedicated professionals works tirelessly to ensure that you receive
            the best care possible.
          </p>
          <p className="text-gray-700  md:mb-16 mb-8">
            Our hospital is equipped with state-of-the-art technology and a wide
            range of medical services, including cardiology, neurology, and
            orthopedics. We strive to maintain a warm and welcoming environment
            for our patients and their families.
          </p>
          <h2 className="md:text-4xl text-2xl font-serif text-primary text-start capitalize font-semibold mb-5 border-b-2 border-secondary inline-block">
            Our Mission
          </h2>
          <p className="text-gray-700  md:mb-16 mb-8">
            Our mission is to provide compassionate, accessible, and
            high-quality healthcare to all our patients. We believe in treating
            each patient with respect and dignity while offering the best
            medical care available.
          </p>
          <h2 className="md:text-4xl text-2xl font-serif text-primary text-start capitalize font-semibold mb-5 border-b-2 border-secondary inline-block">
            Our Vision
          </h2>
          <p className="text-gray-700  md:mb-16 mb-8">
            Our vision is to be a leader in healthcare, recognized for our
            patient-centered approach, innovative practices, and commitment to
            excellence in all we do.
          </p>
          <h2 className="md:text-4xl text-2xl font-serif text-primary text-start capitalize font-semibold mb-5 border-b-2 border-secondary inline-block">
            Meet Our Team
          </h2>
          <p className="text-gray-700  md:mb-16 mb-8">
            Our team consists of experienced healthcare professionals who are
            passionate about their work. We continuously strive to improve our
            services and keep up with the latest advancements in medicine.
          </p>
          <p className="text-gray-700 ">
            Thank you for choosing us for your healthcare needs. We look forward
            to serving you!
          </p>
        </div>
      </div>
    </UserLayout>
  );
}
