"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { Customer, CustomerInput } from "@/types/customer";
import { updateCustomer } from "@/services/customer";
import { CustomerRole } from "@/types/customerRole";
import { getCustomerRoles } from "@/services/customerRole";

interface UpdateCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer: Customer;
  onUpdate: () => void;
}

export default function UpdateCustomerDialog({
  open,
  onClose,
  customer,
  onUpdate,
}: UpdateCustomerDialogProps) {
  const [customerInput, setCustomerInput] = useState<CustomerInput>({
    phone: "",
    name: "",
    address: "",
    note: "",
    role_id: 1,
    total_orders: 0,
    total_spent: 0,
    recent_orders: 0,
  });
  const [loading, setLoading] = useState(false);
  const [customerRoles, setCustomerRoles] = useState<CustomerRole[]>([]);

  useEffect(() => {
    if (customer) {
      fetchCustomerRoles();
      setCustomerInput({
        phone: customer.phone,
        name: customer.name,
        address: customer.address || "",
        note: customer.note || "",
        role_id: customer.role_id || 1,
        total_orders: customer.total_orders || 0,
        total_spent: customer.total_spent || 0,
        recent_orders: customer.recent_orders || 0, 
      });
    }
  }, [customer]);

  const fetchCustomerRoles = async () => {
    try {
      const res = await getCustomerRoles(false, { page: 1, limit: 100 });
      if (res && res.data) {
        setCustomerRoles(res.data);
      }
    } catch (error) {
      console.error("Error fetching customer roles:", error);
      toast.error("Không lấy được danh sách danh hiệu khách hàng");
    }
  };

  const handleUpdate = async () => {
    if (customer.phone.trim() === "") {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    if (customer.name.trim() === "") {
      toast.error("Vui lòng nhập tên khách hàng");
      return;
    }
    setLoading(true);
    try {
      await updateCustomer(false, customer.id, {
        ...customerInput,
      });
      toast.success("Cập nhật khách hàng thành công");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error(`Cập nhật khách hàng thất bại - ${(error as any).response.data?.error || "Lỗi không xác định"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-[#262626] text-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#f6b100]">Cập nhật khách hàng</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Số điện thoại</label>
          <input
            type="text"
            value={customerInput.phone}
            onChange={(e) =>
              setCustomerInput({ ...customerInput, phone: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Tên khách hàng</label>
          <input
            type="text"
            value={customerInput.name}
            onChange={(e) =>
              setCustomerInput({ ...customerInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Địa chỉ</label>
          <input
            type="text"
            value={customerInput.address || ""}
            onChange={(e) =>
              setCustomerInput({ ...customerInput, address: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Ghi chú</label>
          <input
            type="text"
            value={customerInput.note || ""}
            onChange={(e) =>
              setCustomerInput({ ...customerInput, note: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Số lần giặt</label>
          <input
            type="number"
            value={customerInput.total_orders || 0}
            onChange={(e) =>
              setCustomerInput({
                ...customerInput,
                total_orders: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Danh hiệu</label>
          <select
            value={customerInput.role_id}
            onChange={(e) =>
              setCustomerInput({
                ...customerInput,
                role_id: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            {
              customerRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))
            }
          </select>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 p-2 bg-gray-500 text-[#f5f5f5] font-semibold rounded hover:bg-gray-600 transition-all"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
