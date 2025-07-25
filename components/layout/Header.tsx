"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FRONTEND_URL } from "@/config/variables";
import { FaSearch, FaBell, FaUserCircle, FaTrashAlt } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { NotificationsResponse } from "@/types/notification";
import {
  countUnreadNotifications,
  deleteNotification,
  deleteReadNotification,
  getNotifications,
  markNotificationAsRead,
} from "@/services/notification";
import NotificationBadge from "../ui/NotificationBadge";
import { WashOrdersResponse } from "@/types/washOrder";
import { getWashOrders } from "@/services/washOrder";
import toast from "react-hot-toast";
import Link from "next/link";

interface HeaderProps {
  data: User;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [notifications, setNotifications] =
    useState<NotificationsResponse | null>(null);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [washOrders, setWashOrders] = useState<WashOrdersResponse | null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const username = data.username;
  const role = data.role;

  function handleLogout() {
    Cookies.remove("token");
    router.push("/login");
  }

  const fetchAll = async () => {
    try {
      const [notifRes, unreadRes, ordersRes] = await Promise.all([
        getNotifications(false, { limit: 100 }),
        countUnreadNotifications(false, {}),
        getWashOrders(false, { date: "today", limit: 100 }),
      ]);

      if (notifRes?.data) setNotifications(notifRes);
      if (unreadRes?.data) setNotificationNumber(unreadRes.data.unread_count);
      if (ordersRes?.data) setWashOrders(ordersRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteReadNotification = async () => {
    try {
      await deleteReadNotification(false);
      fetchAll();
      toast.success("Đã xoá tất cả thông báo đã đọc");
    } catch (error) {
      console.error("Error delete notification:", error);
    }
  }

  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteNotification(false, id);
      fetchAll();
    } catch (error) {
      console.error("Error delete notification:", error);
    }
  };

  const handleReadNotification = async (id: number) => {
    try {
      await markNotificationAsRead(false, id, { is_read: true });
      fetchAll();
    } catch (error) {
      console.error("Error read notification:", error);
    }
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      return;
    }
    fetchAll();
    const interval = setInterval(() => {
      fetchAll();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-wrap justify-between items-center py-4 px-4 md:px-8 bg-[#1a1a1a] gap-4 relative z-50">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img
          src={`${FRONTEND_URL}/globe.svg`}
          className="h-8 w-8"
          alt="Laundry Logo"
        />
        <Link href="/" title="Trang chủ"><h1 className="text-xl font-semibold text-[#f5f5f5]">Giặt Sấy Thiên Nhi</h1></Link>
      </div>

      {/* SEARCH */}
      {/* <div className="hidden md:flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-full md:w-[400px] lg:w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
        />
      </div> */}

      {/* NOTIFICATION + USER */}
      <div className="flex items-center gap-4 ml-auto relative">
        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="bg-[#1f1f1f] rounded-[15px] p-3 relative"
          >
            <FaBell className="text-[#f5f5f5] text-2xl" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 rounded-full">
              {notificationNumber}
            </span>
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
              <ul className="text-sm">
                <li className="flex items-center text-yellow-300 gap-1 px-4 py-2 font-bold border-b border-[#444]">
                  <FaBell /> Hôm nay: {washOrders ? washOrders.total : 0} đơn
                  giặt mới
                </li>
                <button 
                onClick={() => {
                  handleDeleteReadNotification();
                }}
                
                className="bg-[#222] font-bold text-red-500 w-full px-1 py-2 cursor-pointer hover:bg-[#333]">Xoá tất cả thông báo</button>
                {notifications?.data?.length ? (
                  notifications.data.map((notification) => (
                    <li
                      onClick={() => {
                        if (!notification.is_read) {
                          handleReadNotification(notification.id);
                        }
                      }}
                      key={notification.id}
                      className={`flex justify-between ${!notification.is_read
                          ? "bg-[#3f3f3f] cursor-pointer font-bold"
                          : ""
                        } items-center px-4 py-2 border-b border-[#444]`}
                    >
                      <NotificationBadge type={notification.type} />
                      <span className="ml-2 flex-1 tracking-wide">
                        {notification.title}
                      </span>
                      <button
                        onClick={() =>
                          handleDeleteNotification(notification.id)
                        }
                        className="ml-2 hover:text-red-300 cursor-pointer"
                      >
                        <FaTrashAlt size={10} />
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400 italic">
                    Không có thông báo
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 cursor-pointer focus:outline-none"
          >
            <FaUserCircle className="text-[#f5f5f5] text-3xl md:text-4xl" />
            <div className="hidden md:flex flex-col items-start text-left">
              <h1 className="text-md text-[#f5f5f5] font-semibold">
                {username}
              </h1>
              <p className="text-xs text-[#ababab]">{role}</p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-[#444]">
                <p className="font-semibold">{username}</p>
                <p className="text-sm text-[#ababab]">{role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-[#3a3a3a] text-red-400"
              >
                <HiOutlineLogout className="text-xl" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
