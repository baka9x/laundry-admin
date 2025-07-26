import { formatVND } from "@/lib/formatVND";
import { CustomersResponse } from "@/types/customer";
import Link from "next/link";
import React from "react";
import { FaAddressCard, FaClock, FaMoneyBill, FaPhoneAlt, FaShoppingCart, FaUser } from "react-icons/fa";

type PopularCustomersProps = {
  data: CustomersResponse;
};

const PopularCustomers: React.FC<PopularCustomersProps> = ({ data }) => {
  return (
    <div>
      <div className="bg-[#1a1a1a] w-full rounded-2xl shadow-lg mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]">
          <h2 className="text-[#f5f5f5] text-xl font-bold">Khách hàng phổ biến</h2>
          <Link href="/customers" className="text-[#4f9dfc] text-sm font-medium hover:underline">
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 p-6 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333]">
          {data?.data?.map((item, index) => (
            <div key={index} className="bg-[#2a2a2a] rounded-xl p-4 flex gap-4 items-start hover:bg-[#333] transition duration-300 ease-in-out">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#f6b100] text-[#1a1a1a] font-bold w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-md">
                  #{index + 1}
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-[#f5f5f5] text-lg font-semibold mb-1"><span className="flex items-center gap-2"><FaPhoneAlt size={16} /> {item.phone}</span></h3>
                <div className="flex items-center gap-2 text-sm text-blue-400 font-bold mb-1">
                  <FaUser size={16} />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-red-300 font-bold mb-1">
                  <FaShoppingCart size={16} />
                  <span>{item.total_orders} lượt giặt</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-500 font-bold mb-1">
                  <FaMoneyBill size={16} />
                  <span>{formatVND(item.total_spent)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#b0b0b0]">
                  <FaClock size={16} />
                  <span>{new Date(item.updated_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#b0b0b0] mb-1">
                  <FaAddressCard size={16} />
                  <span>{item.address !== "" ? item.address : "N/A"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCustomers;
