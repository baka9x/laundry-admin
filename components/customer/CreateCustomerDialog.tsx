"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { CustomerInput } from "@/types/customer";
import { createCustomer } from "@/services/customer";

interface CreateCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreateCustomerDialog({
  open,
  onClose,
  onAdd,
}: CreateCustomerDialogProps) {
  const [newCustomerInput, setNewCustomerInput] = useState<CustomerInput>({
    phone: "",
    name: "",
    address: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (newCustomerInput.phone.trim() === "") {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    if (newCustomerInput.name.trim() === "") {
      toast.error("Vui lòng nhập tên khách hàng");
      return;
    }
    setLoading(true);
    try {
      await createCustomer(false, newCustomerInput);
      toast.success("Thêm khách hàng thành công");
      setNewCustomerInput({
        phone: "",
        name: "",
        address: "",
        note: "",
      });
      onAdd();
      onClose();
    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error(`Thêm khách hàng thất bại - ${(error as any).response.data?.error || "Lỗi không xác định"}`);
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
          <h2 className="text-xl font-bold text-[#f6b100]">Thêm khách hàng mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Số điện thoại</label>
          <input
            type="text"
            value={newCustomerInput.phone}
            onChange={(e) =>
              setNewCustomerInput({ ...newCustomerInput, phone: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Tên khách hàng</label>
          <input
            type="text"
            value={newCustomerInput.name}
            onChange={(e) =>
              setNewCustomerInput({ ...newCustomerInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Địa chỉ</label>
          <input
            type="text"
            value={newCustomerInput.address || ""}
            onChange={(e) =>
              setNewCustomerInput({ ...newCustomerInput, address: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Ghi chú</label>
          <input
            type="text"
            value={newCustomerInput.note || ""}
            onChange={(e) =>
              setNewCustomerInput({ ...newCustomerInput, note: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
        
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang thêm..." : "Thêm"}
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
