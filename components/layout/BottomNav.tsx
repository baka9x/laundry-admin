"use client";

import { useRouter, usePathname } from "next/navigation";
import { CiCircleMore } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { LuWashingMachine } from "react-icons/lu";
import { RiDrinks2Fill } from "react-icons/ri";
import clsx from "clsx";


export default function BottomNav() {
  
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Trang chủ", path: "/", icon: <FaHome size={20} /> },
    {
      label: "Đơn giặt",
      path: "/wash-order",
      icon: <LuWashingMachine size={20} />,
    },
    {
      label: "Đồ uống",
      path: "/drink-order",
      icon: <RiDrinks2Fill size={20} />,
    },
    { label: "Thêm", path: "/more", icon: <CiCircleMore size={20} /> },
  ];

  return (
    <>
    <footer className="fixed bottom-0 left-0 right-0 bg-[#262626] border-t border-[#3a3a3a] z-50">
      <div className="flex justify-around items-center h-16 px-2 sm:px-4">
        {navItems.map((item) => (
          <button
            suppressHydrationWarning
            key={item.path}
            onClick={() => router.push(item.path)}
            className={clsx(
              "flex flex-col cursor-pointer items-center justify-center text-xs sm:text-sm text-[#ababab] w-full px-2 sm:px-4 py-1 rounded-md transition-colors duration-200",
              pathname === item.path && "bg-[#343434] text-white"
            )}
          >
            <span>{item.icon}</span>
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Floating action button (FAB) */}
      
    </footer>
    </>
  );
}
