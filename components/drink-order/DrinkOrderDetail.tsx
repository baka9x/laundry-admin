"use client";

import { useEffect, useState } from "react";
import Dropdown from "../ui/DropDown";
import { WashOrder, WashOrdersResponse } from "@/types/washOrder";
import { getWashOrders, updateWashOrderStatus } from "@/services/washOrder";
import toast from "react-hot-toast";
import { dateOptions, statusOptions } from "@/config/variables";
import StatusBadge from "../ui/StatusBadge";
import { useRouter } from "next/navigation";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { createNotification } from "@/services/notification";
import { formatVND } from "@/lib/formatVND";
import { getDrinkOrders } from "@/services/drinkOrder";
import { DrinkOrdersResponse } from "@/types/drinkOrder";

export default function DrinkOrderDetail() {
  const router = useRouter();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [dateSelected, setDateSelected] = useState("Hôm nay");
  const [statusSelected, setStatusSelected] = useState("Tất cả");
  const [dateFilter, setDateFilter] = useState<string>("today");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [items, setItems] = useState<DrinkOrdersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;
  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getDrinkOrders(false, {
        status: statusFilter,
        date: dateFilter,
        page: page,
        limit: limit,
      });
      if (!data || !data.data) {
        toast.error("Không có dữ liệu đơn hàng");
        setItems(null);
        return;
      }
      setItems(data);
    } catch (error) {
      console.error("Error fetching drink orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [page, dateFilter, statusFilter]);

  const handleDateSelect = (value: string) => {
    const selected = dateOptions.find((opt) => opt.value === value);
    if (selected) {
      setDateSelected(selected.label);
      setDateFilter(selected.value);
      setPage(1);
      setOpenDropdownId(null);
    }
  };

  const handleStatusSelect = (value: string) => {
    const selected = statusOptions.find((opt) => opt.value === value);
    if (selected) {
      setStatusSelected(selected.label);
      setStatusFilter(selected.value);
      setPage(1);
      setOpenDropdownId(null);
    }
  };
  

  

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 md:px-6 lg:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Đơn đồ uống
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
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

      <div className="px-4 py-6">
        {loading && <p className="text-[#ababab]">Đang tải dữ liệu...</p>}
        {!loading && items && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.data.map((item) => (
              <div
                key={item.id}
                className="bg-[#1e1e1e] rounded-2xl p-4 shadow-lg border border-[#333]
                   hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#f6b100] text-[#1e1e1e] text-sm font-bold px-3 py-1 rounded-full shadow">
                    Đơn đồ uống #{item.id}
                  </span>
                  
                </div>
                <h3 className="text-[#f5f5f5] text-base font-semibold mb-2 truncate">
                  SĐT: {item.customer_phone} ({item.customer_name})
                </h3>
                <div className="grid grid-cols-2 gap-y-2 text-sm max-w-md">
                  <div className="text-[#ababab] font-medium">Ngày đặt hàng:</div>
                  <div className="text-[#f5f5f5]">{new Date(item.order_date).toLocaleString()}</div>
                  <div className="text-[#ababab] font-medium">Ngày giao:</div>
                  <div className="text-[#ababab] font-medium">Tổng giá tiền:</div>
                  <div className="text-red-300 font-bold">{formatVND(item.total_amount)}</div>
                  {/* <div className="text-[#f5f5f5]">{item.note}</div> */}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  {item.status !== "deliveried" &&
                    item.status === "completed" && (
                      <button
                        onClick={() => router.push(`/wash-order/${item.id}`)}
                        className="text-[#f6b100] text-xs hover:underline cursor-pointer"
                      >
                        Tính tiền
                      </button>
                    )}
                  {item.status === "deliveried" && (
                    <button className="text-[#f6b100] text-xs hover:underline cursor-pointer">
                      Xem chi tiết
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {(!items || items.data.length === 0) && !loading && (
        <div className="text-center text-[#ababab]">
          Dữ liệu đang chờ cập nhật...
        </div>
      )}

      {items && items.total_pages > 1 && (
        <div className="flex justify-end items-center gap-2 px-4 py-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 bg-[#333] text-[#f5f5f5] rounded disabled:opacity-40"
          >
            ◀ Trước
          </button>
          <span className="text-[#f5f5f5]">
            Trang {page} / {items.total_pages}
          </span>
          <button
            disabled={page >= items.total_pages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 bg-[#333] text-[#f5f5f5] rounded disabled:opacity-40"
          >
            Sau ▶
          </button>
        </div>
      )}
    </>
  );
}
