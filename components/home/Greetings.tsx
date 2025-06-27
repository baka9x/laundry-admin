"use client";

import { getGreeting } from "@/lib/greeting";
import { useEffect, useState } from "react";
import GreetingText from "./GreetingText";
import { User } from "@/types/user";

interface HomeProps {
  data: User;
}

const Greetings: React.FC<HomeProps> = ({ data }) => {
  const [username] = useState(data.username);
  const [dateTime, setDateTime] = useState(new Date());
  const initialGreeting = getGreeting();

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date): string => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(
      2,
      "0"
    )}, ${date.getFullYear()}`;
  };

  const formatTime = (date: Date): string => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 mt-5 gap-4">
      <div className="text-left md:text-start">
        <h1 className="text-[#f5f5f5] text-lg md:text-2xl font-semibold tracking-wide">
          <GreetingText initialGreeting={initialGreeting} /> {username}
        </h1>
        <p className="text-[#ababab] text-sm md:text-base">
          Chúc bạn một ngày làm việc vui vẻ nhé!
        </p>
      </div>

      <div className="text-left md:text-right text-white">
        <h2
          className="text-2xl md:text-3xl font-semibold tracking-wide text-[#f5f5f5]"
          suppressHydrationWarning
        >
          {formatTime(dateTime)}
        </h2>
        <p className="text-[#ababab] text-sm md:text-base">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
};

export default Greetings;
