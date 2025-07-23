import { CustomersResponse } from "@/types/customer";
import Link from "next/link";
import React from "react";

type PopularDrinksProps = {
  data: CustomersResponse;
};

const PopularDrinks: React.FC<PopularDrinksProps> = ({ data }) => {
  return (
    <div>
      <div className="bg-[#1a1a1a] w-full rounded-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Đồ uống phổ biến
          </h3>
          <Link
            href="/drink-order"
            className="text-[#025cca] text-sm font-semibold"
          >
            Xem tất cả
          </Link>
        </div>
     

      <div className="mt-4 px-6 overflow-y-scroll h-[300px]">
        {data.data.map((item, index) => (
          <div key={index} className="flex items-center gap-5 mb-3">
            <button className="bg-[#f6b100] text-[#f5f5f5] p-3 text-xl font-bold rounded-lg">
              #{index}
            </button>
            <div className="flex items-center justify-between w-[100%]">
              <div className="flex flex-col items-start gap-1">
                <h3 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
                  {item.name}
                </h3>
                <p className="text-[#ababab] text-sm">
                  Số điện thoại: {item.phone}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-[#ababab] text-sm">
                  Tổng lượt giặt: {item.total_orders}
                </p>
                <p className="text-[#ababab] text-sm">
                  Tổng chi tiêu: {item.total_spent} VNĐ
                </p>
                <p className="text-[#ababab] text-sm">
                  Lần giặt gần nhất: {new Date(item.updated_at).toLocaleString()}
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

export default PopularDrinks;
