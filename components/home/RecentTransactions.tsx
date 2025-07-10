import { WashOrdersResponse } from "@/types/washOrder";
import Link from "next/link";
import React from "react";
import { FaCheckDouble, FaCircle, FaSearch } from "react-icons/fa";

type RecentTransactionsProps = {
  data: WashOrdersResponse;
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ data }) => {
  return (
    <div className="mt-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Các giao dịch gần đây
          </h3>
          <Link
            href="/transactions"
            className="text-[#025cca] text-sm font-semibold"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Tìm kiếm giao dịch gần đây"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
          />
        </div>

        {/* Transaction list */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px]">
          {data && data.data && data.data.map((item, index) => (
            <div key={index} className="flex items-center gap-5 mb-3">
              <button className="bg-[#f6b100] text-[#f5f5f5] p-3 text-xl font-bold rounded-lg">
                #{index}
              </button>
              <div className="flex items-center justify-between w-[100%]">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
                    Đơn hàng #{item.id}
                  </h3>
                  <p className="text-[#ababab] text-sm">
                    Khách hàng: {item.customer_phone}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-green-600 px-4">
                    <FaCheckDouble className="inline mr-2" /> {item.status}
                  </p>
                  <p className="text-[#ababab] text-sm flex items-center">
                    <FaCircle className="inline mr-2 text-green-600" />
                    {item.pickup_time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
