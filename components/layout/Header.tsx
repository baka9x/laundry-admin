'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FRONTEND_URL } from '@/config/variables';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { useState } from 'react';
import { User } from '@/types/user';
import clsx from 'clsx';

interface HeaderProps {
  data: User;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const [username] = useState(data.username);
  const [role] = useState(data.role);
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  function handleLogout() {
    Cookies.remove('token');
    router.push('/login');
  }

  return (
    <header className="flex flex-wrap justify-between items-center py-4 px-4 md:px-8 bg-[#1a1a1a] gap-4 relative z-50">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img
          src={`${FRONTEND_URL}/globe.svg`}
          className="h-8 w-8"
          alt="Laundry Logo"
        />
        <h1 className="text-xl font-semibold text-[#f5f5f5]">AdminPanel</h1>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-full md:w-[400px] lg:w-[500px]">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
        />
      </div>

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
              3
            </span>
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-[#2a2a2a] text-[#f5f5f5] rounded-lg shadow-lg z-50">
              <ul className="text-sm">
                <li className="px-4 py-2 border-b border-[#444]">🔔 Bạn có 3 đơn mới</li>
                <li className="px-4 py-2 border-b border-[#444]">👕 Đơn hàng #12345 đã xong</li>
                <li className="px-4 py-2">💬 Khách A vừa nhắn tin</li>
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
              <h1 className="text-md text-[#f5f5f5] font-semibold">{username}</h1>
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
