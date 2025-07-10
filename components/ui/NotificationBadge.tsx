import React from "react";
import { FaFile } from "react-icons/fa";
import { GiExtraTime } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";

interface NotificationBadgeProps {
  type: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ type }) => {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1
        ${
          type === "order"
            ? "bg-green-600 text-white"
            : type === "promotion"
            ? "bg-yellow-600 text-white"
            : "bg-red-600 text-white"
        }`}
    >
      {type === "order" ? (
        <FaFile />
      ) : type === "promotion" ? (
        <GiExtraTime />
      ) : (
        <IoSettings />
      )}{" "}
      
    </span>
  );
};

export default NotificationBadge;
