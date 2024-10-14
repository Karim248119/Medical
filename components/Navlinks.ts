import {
  FaUserDoctor,
  FaHandHoldingMedical,
  FaNewspaper,
} from "react-icons/fa6";
import { FaBriefcaseMedical, FaUsers } from "react-icons/fa";
import { IoCalendar, IoArrowBackCircle } from "react-icons/io5";

export const UserLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
  { name: "Services", path: "/Services" },
  { name: "Doctors", path: "/Doctors" },
  { name: "News", path: "/News" },
  { name: "Contact", path: "/Contact" },
];

export const AdminLinks = [
  { name: " users", path: "/admin", icon: FaUsers },
  { name: " Doctors", path: "/admin/doctors", icon: FaUserDoctor },
  {
    name: " specialities",
    path: "/admin/specialities",
    icon: FaBriefcaseMedical,
  },
  { name: " Services", path: "/admin/services", icon: FaHandHoldingMedical },
  { name: " News", path: "/admin/news", icon: FaNewspaper },
  { name: " appointment", path: "/admin/appointments", icon: IoCalendar },
  { name: "Home", path: "/", icon: IoArrowBackCircle },
];
