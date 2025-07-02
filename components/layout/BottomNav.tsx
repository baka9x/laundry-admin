"use client";

import { useRouter, usePathname } from "next/navigation";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { LuWashingMachine } from "react-icons/lu";
import { RiDrinks2Fill } from "react-icons/ri";
import clsx from "clsx";
import { useState } from "react";
import CreateOrderDialog from "../wash-order/CreateOrderDialog";

export default function BottomNav() {
  const [showDialog, setShowDialog] = useState(false);
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
            <span className="hidden sm:inline mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Floating action button (FAB) */}
      <button
        onClick={() => setShowDialog(true)}
        suppressHydrationWarning
        className="absolute bottom-20 sm:bottom-20 left-1/2 transform -translate-x-1/2 bg-[#f6b100] text-white rounded-full p-4 shadow-lg"
      >
        <BsFillFileEarmarkPlusFill size={28} />
      </button>
      <CreateOrderDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </footer>
  );
}
