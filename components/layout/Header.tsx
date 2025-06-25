'use client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FRONTEND_URL } from '@/config/variables';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

export default function Header() {
    const router = useRouter();
    function handleLogout() {
        Cookies.remove('token');
        router.push('/login');
    }
    return (
        <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
            {/* LOGO */}
            <div className="flex items-center gap-2">
                <img src={`${FRONTEND_URL}/globe.svg`} className="h-8 w-8" alt="Laundry Logo" />
                <h1 className="text-xl font-semibold">Laundry</h1>
            </div>
            {/* SEARCH */}
            <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]">
                <FaSearch className="text-[#f5f5f5]" />
                <input type="text" placeholder="Tìm kiếm" className="bg-[#1f1f1f] outline-none text-[#f5f5f5]" />
            </div>
            {/* LOGGED USER DETAIL */}
            <div className="flex items-center gap-4">
                <div className="bg-[#1f1f1f] rounded-[15px] p-3">
                    <FaBell className="text-[#f5f5f5] text-2xl" />
                </div>
                <div className="flex items-center gap-3 cursor-pointer">
                    <FaUserCircle className="text-[#f5f5f5] text-4xl" />
                    <div className="flex flex-col items-start">
                        <h1 className="text-md text-[#f5f5f5] font-semibold">Baka9x</h1>
                        <p className="text-xs text-[#ababab]">Admin</p>
                        <button onClick={handleLogout} className="text-sm text-[#f5f5f5] hover:underline">
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>

        </header>
    );
}
