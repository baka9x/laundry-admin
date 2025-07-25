import { formatVND } from "@/lib/formatVND";
import { WashOrdersResponse } from "@/types/washOrder";
import Link from "next/link";
import React from "react";
import { BiSolidWasher } from "react-icons/bi";
import { FaCheckCircle, FaClock, FaHourglassHalf, FaPhoneAlt, FaQuestionCircle, FaShoppingCart} from "react-icons/fa";

type RecentTransactionsProps = {
  data: WashOrdersResponse;
};

const getStatusInfo = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return {
        color: "text-purple-500",
        icon: <BiSolidWasher className="inline mr-1" />,
        label: "Đã giặt xong",
      };
    case "processing":
      return {
        color: "text-red-500",
        icon: <FaHourglassHalf className="inline mr-1" />,
        label: "Đang xử lý",
      };
    case "pending":
      return {
        color: "text-yellow-500",
        icon: <FaClock className="inline mr-1" />,
        label: "Đang chờ",
      };
    case "deliveried":
      return {
        color: "text-green-500",
        icon: <FaCheckCircle className="inline mr-1" />,
        label: "Đã thanh toán",
      };
    default:
      return {
        color: "text-gray-500",
        icon: <FaQuestionCircle className="inline mr-1" />,
        label: "Đã huỷ",
      };
  }
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ data }) => {
  return (
    <div className="mt-6">
      <div className="bg-[#1a1a1a] w-full rounded-xl shadow-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
          <h2 className="text-[#f5f5f5] text-lg font-semibold">Các đơn giặt gần đây</h2>
          <Link href="/transactions" className="text-[#3b82f6] text-sm font-medium hover:underline">
            Xem tất cả
          </Link>
        </div>

        {/* Grid layout 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-4 max-h-[400px] overflow-y-auto">
          {data?.data?.map((item, index) => {
            const statusInfo = getStatusInfo(item.status);
            return (
              <div
                key={index}
                className="bg-[#2a2a2a] rounded-lg p-4 flex flex-col gap-2 hover:bg-[#333] transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="bg-[#f6b100] text-[#1e1e1e] text-sm font-bold px-3 py-1 rounded-full shadow">
                    <FaShoppingCart className="inline mr-1" />Đơn giặt #{item.id}
                    </h3>
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                </div>

                <p className="text-sm text-gray-400">
                  <span className="text-white flex items-center font-bold"><FaPhoneAlt className="inline mr-1" />{item.customer_phone} ({item.customer_name})</span>
                </p>

                <div className="flex flex-col items-end gap-1 text-right">
                  <p className={`${statusInfo.color} text-sm font-medium flex items-center`}>
                    {statusInfo.icon}
                    {statusInfo.label}
                  </p>
                </div>

                <div className="text-right text-[#f6b100] font-semibold text-lg">
                  {formatVND(item.total_amount)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default RecentTransactions;
