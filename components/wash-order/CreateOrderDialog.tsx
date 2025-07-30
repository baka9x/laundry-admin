"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { getUserProfile, getUsers } from "@/services/user";
import { UsersResponse } from "@/types/user";
import { CustomerInput, CustomersResponse } from "@/types/customer";
import { createCustomer, getCustomers } from "@/services/customer";
import { createWashOrder } from "@/services/washOrder";
import { createNotification } from "@/services/notification";
import { PromotionsResponse } from "@/types/promotion";
import { getPromotions } from "@/services/promotion";

interface CreateOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreateOrderDialog({
  isOpen,
  onClose,
  onAdd,
}: CreateOrderDialogProps) {
  const [searchPhone, setSearchPhone] = useState("");
  const [customers, setCustomers] = useState<CustomersResponse>();
  const [users, setUsers] = useState<UsersResponse>();
  const [promotions, setPromotions] = useState<PromotionsResponse>();

  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [newCustomer, setNewCustomer] = useState<CustomerInput>({
    phone: "",
    name: "",
    address: "",
  });
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [orderDate, setOrderDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(
    null
  );
  const fetchCustomers = async () => {
    try {
      const customersData = await getCustomers(false);
      setCustomers(customersData);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách khách hàng");
    }
  };

  const fetchPromotions = async () => {
    try {
      const promotionsData = await getPromotions(false, { limit: 50 });
      setPromotions(promotionsData);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách khuyến mại");
    }
  };

  const fetchUser = async () => {
    try {
      const user = await getUserProfile(false);
      setSelectedUser(user.id);
    } catch (error) {
      toast.error("Lỗi khi tải thông tin nhân viên");
    }
  };

  const fetchUsers = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách nhân viên");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCustomers();
      fetchUser();
      fetchUsers();
      fetchPromotions();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchPhone.trim() === "") {
      setCustomers({} as CustomersResponse);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      const res = await getCustomers(false, { phone: searchPhone });
      setCustomers(res);
      if (res.data.length > 0) {
        setSelectedCustomer(res.data[0].id);
      } else {
        setSelectedCustomer(null);
      }
      setShowAddCustomer(false);
      setNewCustomer({ phone: searchPhone, name: "", address: "" });
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [searchPhone]);

  const handleAddCustomer = async () => {
    try {
      if (!newCustomer.phone || !newCustomer.name) {
        toast.error("Vui lòng nhập đầy đủ thông tin khách hàng.");
        return;
      }

      const res = await createCustomer(false, newCustomer);
      const updatedCustomers = await getCustomers(false, { phone: newCustomer.phone });
      setCustomers(updatedCustomers);
      const newCust = updatedCustomers.data.find(
        (c) => c.phone === newCustomer.phone
      );
      setSelectedCustomer(newCust ? newCust.id : null);
      setShowAddCustomer(false);
      if (res?.error != null) {
        toast.error(`Lỗi: ${res.error}`);
        return;
      }
      toast.success("Đã thêm khách hàng mới thành công!");
      setNewCustomer({ phone: "", name: "", address: "" });
      setSearchPhone(""); // reset search input
    } catch (error) {
      toast.error("Khách hàng với số điện thoại đã tồn tại.");
      console.error(error);
      return;
    }
  };

  const handleAddNotification = async (item: {
    id: any;
    pickUpTime: string;
    totalAmount: number;
    status: string;
  }) => {
    try {
      await createNotification(false, {
        title: `Đơn hàng #${item.id} ${item.status}.`,
        content: `Đơn hàng #${item.id} - 
          pickup_time: ${item.pickUpTime} - 
          Tổng giá tiền (Tạm tính): ${item.totalAmount}đ`,
        type: "order",
      });
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedCustomer || !selectedUser) {
      toast.error(
        "Vui lòng điền đúng số điện thoại khách hàng, nhân viên và ngày đặt hàng."
      );
      return;
    }
    const orderDateTime = new Date(orderDate);
    let formattedPickupTime: Date | null = null;
    if (pickupTime) {
      formattedPickupTime = new Date(pickupTime);
      if (isNaN(formattedPickupTime.getTime())) {
        toast.error("Ngày giờ lấy đồ không hợp lệ!");
        return;
      }
    }
    try {
      const res = await createWashOrder({
        customer_id: selectedCustomer,
        user_id: selectedUser,
        order_date: orderDateTime,
        pickup_time: formattedPickupTime,
        total_amount: totalAmount,
        promotion_id: selectedPromotion ?? null,
        total_profit: 0,
      });
      handleAddNotification({
        id: res.order_id,
        pickUpTime: pickupTime,
        totalAmount: totalAmount,
        status: "đã tạo thành công",
      });
      toast.success("Đơn giặt đã được tạo thành công!");
      onClose();
      onAdd && onAdd();
    } catch (error) {
      toast.error("Lỗi khi tạo đơn giặt. Vui lòng kiểm tra lại thông tin.");
      console.error(error);
      return;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-[#262626] text-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#f6b100]">Tạo đơn giặt mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>

        <div>
          <label className="block mb-1 text-sm">
            Khách hàng (tìm theo SĐT)
          </label>
          <input
            type="text"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Nhập số điện thoại..."
            className="w-full p-2 rounded bg-[#343434] text-white"
          />

          {/* Hiện dropdown kết quả */}
          {customers && customers.data && customers.data.length > 0 && (
            <div className="bg-[#343434] rounded mt-1 max-h-40 overflow-auto border border-[#444]">
              {customers.data.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCustomer(c.id);
                    setSearchPhone(c.phone); // gán lại để input hiển thị số
                    setCustomers({} as CustomersResponse); // ẩn dropdown sau khi chọn
                  }}
                  className="p-2 hover:bg-[#444] cursor-pointer"
                >
                  {c.phone} - {c.name}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-1">
            {selectedCustomer && customers?.data?.length ? (
              <div className="mt-1 text-xs text-[#f6b100]">
                Đã chọn ID: {selectedCustomer} - Khách hàng:{" "}
                {customers.data.find((c) => c.id === selectedCustomer)?.name ||
                  "Không tìm thấy"}
              </div>
            ) : null}
            <button
              onClick={() => setShowAddCustomer(true)}
              className="text-xs text-[#f6b100] hover:underline"
            >
              + Thêm khách mới
            </button>
          </div>
        </div>
        {/* Add customer dialog */}
        {showAddCustomer && (
          <div className="bg-[#343434] p-4 rounded space-y-2">
            <input
              type="text"
              placeholder="SĐT"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              className="w-full p-2 rounded bg-[#262626] text-white"
            />
            <input
              type="text"
              placeholder="Tên"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              className="w-full p-2 rounded bg-[#262626] text-white"
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={newCustomer.address}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, address: e.target.value })
              }
              className="w-full p-2 rounded bg-[#262626] text-white"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCustomer}
                className="flex-1 bg-[#f6b100] p-2 rounded"
              >
                Thêm
              </button>
              <button
                onClick={() => setShowAddCustomer(false)}
                className="flex-1 bg-gray-500 p-2 rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Select user */}
        <div>
          <label className="block mb-1 text-sm">Nhân viên</label>
          <select
            value={selectedUser ?? ""}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
            className="w-full p-2 rounded bg-[#343434] text-white"
          >
            <option value="">Chọn nhân viên</option>
            {users &&
              users.data.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
          </select>
        </div>

        {/* Ngày và giờ */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-sm">Ngày đặt hàng</label>
            <input
              type="datetime-local"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="p-2 rounded bg-[#343434] text-white"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="mb-1 text-sm">Ngày trả hàng</label>
            <input
              type="datetime-local"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="p-2 rounded bg-[#343434] text-white"
            />
          </div>
        </div>

        {/* Total amount */}
        <div>
          <label className="block mb-1 text-sm">Tổng tiền</label>
          <input
            type="number"
            value={totalAmount ?? ""}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            className="w-full p-2 rounded bg-[#343434] text-white"
            placeholder="0"
          />
        </div>

        {/* Promotions */}
        <div>
          <label className="block mb-1 text-sm">Khuyến mãi</label>
          <select
            value={selectedPromotion ?? ""}
            onChange={(e) => setSelectedPromotion(Number(e.target.value))}
            className="w-full p-2 rounded bg-[#343434] text-white"
          >
            <option value="">Không áp dụng</option>
            {promotions &&
              promotions.data.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCreateOrder}
            className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
          >
            Tạo đơn
          </button>
          <button
            onClick={onClose}
            className="flex-1 p-2 bg-gray-500 text-[#f5f5f5] font-semibold rounded hover:bg-gray-600 transition-all"
          >
            Huỷ
          </button>
        </div>
      </div>
    </Dialog>
  );
}
