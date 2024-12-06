import { Grid2x2 } from "lucide-react";
import { AiOutlineTeam } from "react-icons/ai";
import {
  FaClipboardList,
  FaComments,
  FaServicestack,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { RiDashboard3Line } from "react-icons/ri";

const menus = {
  superAdmin: [
    { title: "dashboard", path: "/", icon: RiDashboard3Line },
    { title: "allHotels", path: "/all-hotels", icon: Grid2x2 },
    { title: "services", path: "/services", icon: FaServicestack },
    { title: "chats", path: "/chats", icon: FaComments },
    { title: "feedback", path: "/feedback", icon: MdFeedback },
    { title: "vendor", path: "/vendor", icon: FaUsers },
    { title: "staff", path: "/staff", icon: AiOutlineTeam },
    {
      title: "customerDetails",
      path: "/customer-details",
      icon: FaClipboardList,
    },
    { title: "roleManagement", path: "/role-management", icon: FaUserShield },
    { title: "categories", path: "/categories", icon: RiDashboard3Line },
  ],
  hotelAdmin: [
    { title: "dashboard", path: "/", icon: RiDashboard3Line },
    { title: "services", path: "/services", icon: FaServicestack },
    { title: "activities", path: "/activities", icon: Grid2x2 },
    { title: "chats", path: "/chats", icon: FaComments },
    { title: "feedback", path: "/feedback", icon: MdFeedback },
    { title: "vendor", path: "/vendor", icon: FaUsers },
    { title: "staff", path: "/staff", icon: AiOutlineTeam },
    {
      title: "customerDetails",
      path: "/customer-details",
      icon: FaClipboardList,
    },
    { title: "roleManagement", path: "/role-management", icon: FaUserShield },
    { title: "categories", path: "/categories", icon: RiDashboard3Line },
  ],
  hotelManager: [
    { title: "dashboard", path: "/", icon: RiDashboard3Line },
    { title: "services", path: "/services", icon: FaServicestack },
    { title: "activities", path: "/activities", icon: Grid2x2 },
    { title: "chats", path: "/chats", icon: FaComments },
    { title: "feedback", path: "/feedback", icon: MdFeedback },
    { title: "vendor", path: "/vendor", icon: FaUsers },
    { title: "staff", path: "/staff", icon: AiOutlineTeam },
    {
      title: "customerDetails",
      path: "/customer-details",
      icon: FaClipboardList,
    },
    { title: "roleManagement", path: "/role-management", icon: FaUserShield },
  ],
  serviceManager: [
    {
      title: "customerRequests",
      path: "/customer-requests",
      icon: RiDashboard3Line,
    },
    { title: "security", path: "/security", icon: FaUserShield },
    { title: "chats", path: "/chats", icon: FaComments },
    { title: "feedback", path: "/feedback", icon: MdFeedback },
    { title: "staff", path: "/staff", icon: AiOutlineTeam },
  ],
  reception: [
    {
      title: "customerDetails",
      path: "/customer-details",
      icon: FaClipboardList,
    },
    { title: "checkIn", path: "/check-in", icon: RiDashboard3Line },
    { title: "checkOut", path: "/check-out", icon: FaUserShield },
    { title: "chats", path: "/chats", icon: FaComments },
  ],
};

const getNavMenuByRole = (role: Role) => {
  return menus[role] || [];
};

export default getNavMenuByRole;
