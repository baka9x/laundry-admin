import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import TransactionList from "./TransactionList";

const transactionData = [
  {
    index: 1,
    orderId: "12345",
    phoneNumber: "0900999999",
    status: "Đã hoàn thành",
    note: "Sẵn sàng để giao",
  },
  {
    index: 2,
    orderId: "67890",
    phoneNumber: "0900888888",
    status: "Đang xử lý",
    note: "Chờ thanh toán",
  },
  {
    index: 3,
    orderId: "54321",
    phoneNumber: "0900777777",
    status: "Đã hủy",
    note: "Khách từ chối nhận",
  },
];

const RecentTransactions = () => {
  return (
    <div className="px-8 mt-6">
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
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
        <div className="mt-4 px-6 overflow-y-scroll min-h-[300px]">
          {transactionData.map((item) => (
            <TransactionList key={item.index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
