import React, { ReactNode } from "react";
import Navbar from "../Nav";
import Contact from "../Contact";
import Footer from "../Footer";

const UserLayout = ({
  children,
  noContact = false,
}: {
  children: ReactNode;
  noContact?: boolean;
}) => {
  return (
    <div className="md:pt-40 pt-[136px] bg-white">
      <Navbar />
      {children}
      {!noContact && <Contact />}
      <Footer />
    </div>
  );
};

export default UserLayout;
