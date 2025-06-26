"use client";
import { getGreeting } from "@/lib/greeting";
import { useEffect, useState } from "react";
import GreetingText from "./GreetingText";
import { User } from "@/types/user";

interface HomeProps {
    data: User;
}

const Greetings: React.FC<HomeProps> = ({ data }) => {
    const [username, setUsername] = useState(data.username);
    const [dateTime, setDateTime] = useState(new Date());
    const initialGreeting = getGreeting();


    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date): string => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
    };

    const formatTime = (date: Date): string => {
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };

    return (
        <div className="flex justify-between items-center px-8 mt-5">
            <div>
                <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">
                    <GreetingText initialGreeting={initialGreeting} /> {username}
                </h1>
                <p className="text-[#ababab] text-sm">
                    Chúc bạn một ngày làm việc vui vẻ nhé!
                </p>
            </div>
            <div className="text-right text-white">
                <h2 className="text-3xl font-semibold tracking-wide text-[#f5f5f5] w-[130px]" suppressHydrationWarning>{formatTime(dateTime)}</h2>
                <p className="text-[#ababab] text-sm">{formatDate(dateTime)}</p>
            </div>
        </div>
    );
}


export default Greetings;