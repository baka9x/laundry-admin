"use client";

import { useState } from "react";
import Dropdown from "../ui/DropDown";

const dateOptions = [
  { value: "today", label: "Hôm nay" },
  { value: "week", label: "Tuần này" },
  { value: "month", label: "Tháng này" },
];

const statusOptions = [
  { value: "pending", label: "Đang chờ" },
  { value: "progressing", label: "Đang giặt" },
  { value: "completed", label: "Đã giặt xong" },
  { value: "deliveried", label: "Đã giao" },
];

export default function WashOrderDetail() {
  const [dateSelected, setDateSelected] = useState("Chọn thời gian");
  const [statusSelected, setStatusSelected] = useState("Chọn trạng thái");

  const handleDateSelect = (value: string) => {
    const selected = dateOptions.find((opt) => opt.value === value);
    if (selected) {
      setDateSelected(selected.label);
      console.log("Đã chọn:", selected.value);
    }
  };

  const handleStatusSelect = (value: string) => {
    const selected = statusOptions.find((opt) => opt.value === value);
    if (selected) {
      setStatusSelected(selected.label);
      console.log("Đã chọn:", selected.value);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-10 py-4">
        <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">
          Đơn giặt
        </h1>
        <div className="flex items-center justify-around gap-4">
          {/* <button className="text-[#ababab] text-lg bg-[#383838] rounded-lg px-4 py-2 font-semibold">Tất cả</button> */}
          <div className="flex items-center justify-around gap-4">
            <Dropdown
              label={dateSelected}
              options={dateOptions}
              onSelect={handleDateSelect}
            />
            <Dropdown
              label={statusSelected}
              options={statusOptions}
              onSelect={handleStatusSelect}
            />
          </div>
        </div>
      </div>

      <div className="px-10 py-4">
        {/* <p>dateSelected: {dateSelected}</p>
        <p>statusSelected: {statusSelected}</p> */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-[#262626] rounded-lg p-4">
            <div className="flex items-center gap-5 mb-3">
              <button className="bg-[#f6b100] text-[#f5f5f5] p-3 text-xl font-bold rounded-lg">
                #1
              </button>
              <div className="flex items-center justify-between w-[100%]">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
                    Đơn hàng #f6b100
                  </h3>
                  <p className="text-[#ababab] text-sm">Khách hàng: 1</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
