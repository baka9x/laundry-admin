"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { Customer, CustomerInput } from "@/types/customer";
import { updateCustomer } from "@/services/customer";

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
    priority_level: 0,
    total_washes: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setCustomerInput({
        phone: customer.phone,
        name: customer.name,
        address: customer.address || "",
        note: customer.note || "",
        priority_level: customer.priority_level || 0,
        total_washes: customer.total_washes || 0,

      });
    }
  }, [customer]);

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
      toast.error("Cập nhật khách hàng thất bại");
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
            value={customerInput.total_washes || 0}
            onChange={(e) =>
              setCustomerInput({
                ...customerInput,
                total_washes: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Cấp bậc</label>
          <input
            type="number"
            value={customerInput.priority_level || 0}
            onChange={(e) =>
              setCustomerInput({
                ...customerInput,
                priority_level: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1ff] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 px-3 py-1 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
