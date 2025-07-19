import React from "react";
import { GiExtraTime } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { TbWashDry1 } from "react-icons/tb";

interface NotificationBadgeProps {
  type: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ type }) => {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1
        ${type === "order"
          ? "bg-green-600 text-white"
          : type === "promotion"
            ? "bg-yellow-600 text-white"
            : "bg-red-600 text-white"
        }`}
    >
      {type === "order" ? (
        <TbWashDry1 size={15}/>
      ) : type === "promotion" ? (
        <GiExtraTime size={15}/>
      ) : (
        <IoSettings size={15}/>
      )}{" "}

    </span>
  );
};

export default NotificationBadge;
