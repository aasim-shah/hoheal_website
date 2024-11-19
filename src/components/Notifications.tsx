"use client";

import Link from "next/link";
import { FaBell } from "react-icons/fa";

const Notifications = () => {
  const notifications = 20;
  const value = notifications && (notifications > 9 ? "9+" : notifications);
  return (
    <Link href="/notifications" className="relative">
      <FaBell size={24} className="text-signature-light" />
      {value && (
        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">
          {value}
        </div>
      )}
    </Link>
  );
};

export default Notifications;
