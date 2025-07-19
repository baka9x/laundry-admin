"use client";

import { useEffect, useState } from "react";
import Dropdown from "../ui/DropDown";
import { WashOrder, WashOrdersResponse } from "@/types/washOrder";
import { getWashOrders, updateWashOrderStatus } from "@/services/washOrder";
import toast from "react-hot-toast";
import { dateOptions, statusOptions } from "@/config/variables";
import StatusBadge from "../ui/StatusBadge";
import { useRouter } from "next/navigation";
import CreateOrderDialog from "./CreateOrderDialog";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { createNotification } from "@/services/notification";
import { formatVND } from "@/lib/formatVND";

export default function WashOrderDetail() {
  const router = useRouter();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [dateSelected, setDateSelected] = useState("Hôm nay");
  const [statusSelected, setStatusSelected] = useState("Tất cả");
  const [dateFilter, setDateFilter] = useState<string>("today");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [items, setItems] = useState<WashOrdersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;
  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getWashOrders(false, {
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
      console.error("Error fetching orders:", error);
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
  const handleAddNotification = async (item: {
    id: number;
    customerPhone: string;
    customerName: string;
    pickUpTime: string;
    totalAmount: number;
    status: string;
  }) => {
    try {
      await createNotification(false, {
        title: `Đơn hàng #${item.id} - ${item.customerPhone} (${item.customerName}) ${item.status}.`,
        content: `Đơn hàng #${item.id} - 
            SDT: ${item.customerPhone} (${item.customerName})
            pickup_time: ${item.pickUpTime} - 
            Tổng giá tiền (Tạm tính): ${item.totalAmount}đ`,
        type: "order",
      });
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  const handleChangeOrderStatus = async (
    item: WashOrder,
    newStatus: string
  ) => {
    try {
      await updateWashOrderStatus(item.id, newStatus);
      if (newStatus === "completed") {
        handleAddNotification({
          id: item.id,
          customerName: item.customer_name,
          customerPhone: item.customer_phone,
          pickUpTime: item.pickup_time,
          totalAmount: item.total_amount,
          status: " đã giặt xong",
        });
      } else if (newStatus === "deliveried") {
        handleAddNotification({
          id: item.id,
          customerName: item.customer_name,
          customerPhone: item.customer_phone,
          pickUpTime: item.pickup_time,
          totalAmount: item.total_amount,
          status: " đã thanh toán và giao cho khách",
        });
      } else if (newStatus === "processing") {
        handleAddNotification({
          id: item.id,
          customerName: item.customer_name,
          customerPhone: item.customer_phone,
          pickUpTime: item.pickup_time,
          totalAmount: item.total_amount,
          status: " đang giặt - sấy",
        });
      }
      toast.success(`Đã cập nhật trạng thái đơn #${item.id}`);
      fetchOrders(); // refetch lại danh sách
      setOpenDropdownId(null);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi cập nhật trạng thái");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 md:px-6 lg:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Đơn giặt
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
                    Đơn hàng #{item.id}
                  </span>
                  <div className="relative">
                    <StatusBadge
                      status={item.status}
                      onClick={() => toggleDropdown(item.id)}
                    />

                    {openDropdownId === item.id && (
                      <div className="absolute right-0 w-30 mt-1 bg-[#2a2a2a] border border-[#444] rounded shadow-lg z-10">
                        {statusOptions
                          .filter((opt) => opt.value)
                          .map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() =>
                                handleChangeOrderStatus(item, opt.value)
                              }
                              className="block px-3 py-1 text-left text-xs text-[#f5f5f5] hover:bg-[#3a3a3a] w-full"
                            >
                              {opt.label}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="text-[#f5f5f5] text-base font-semibold mb-2 truncate">
                  SĐT: {item.customer_phone}
                </h3>
                <div className="text-[#ababab] text-sm space-y-1">
                  <p>Tên KH: {item.customer_name}</p>
                  <p>Ngày đặt: {new Date(item.order_date).toLocaleString()}</p>
                  <p>
                    Ngày giao:{" "}
                    {item.pickup_time
                      ? new Date(item.pickup_time).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>Tổng giá tiền: {formatVND(item.total_amount)}</p>
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

      <button
        onClick={() => setShowAddDialog(true)}
        suppressHydrationWarning
        className="absolute bottom-20 sm:bottom-20 left-1/2 transform -translate-x-1/2 bg-[#f6b100] text-white rounded-full p-4 shadow-lg"
      >
        <BsFillFileEarmarkPlusFill size={28} />
      </button>
      <CreateOrderDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={() => {
          fetchOrders(); // reload lại list sau khi thêm
          setShowAddDialog(false); // đóng dialog
        }}
      />
    </>
  );
}
