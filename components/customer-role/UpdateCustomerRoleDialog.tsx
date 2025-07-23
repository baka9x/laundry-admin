"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { CustomerRole, CustomerRoleInput } from "@/types/customerRole";
import { updateCustomerRole } from "@/services/customerRole";

interface UpdateCustomerRoleDialogProps {
  open: boolean;
  onClose: () => void;
  customerRole: CustomerRole;
  onUpdate: () => void;
}

export default function UpdateCustomerRoleDialog({
  open,
  onClose,
  customerRole,
  onUpdate,
}: UpdateCustomerRoleDialogProps) {
  const [customerRoleInput, setCustomerRoleInput] = useState<CustomerRoleInput>({
    name: "",
    description: "",
    min_required: 0,
    max_required: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerRole) {
      setCustomerRoleInput({
        name: customerRole.name,
        description: customerRole.description,
        min_required: customerRole.min_required,
        max_required: customerRole.max_required
      });
    }
  }, [customerRole]);

  const handleUpdate = async () => {
    if (customerRole.name.trim() === "") {
      toast.error("Vui lòng nhập tên danh hiệu khách hàng");
      return;
    }
    if (customerRole.min_required === null || customerRole.min_required < 0) {
      toast.error("Vui lòng nhập số lần giặt tối thiểu hợp lệ");
      return;
    }
    if (customerRole.max_required === null || customerRole.max_required < 0) {
      toast.error("Vui lòng nhập số lần giặt tối đa hợp lệ");
      return;
    }

    if (customerRole.min_required > customerRole.max_required) {
      toast.error("Số lần giặt tối thiểu không thể lớn hơn số lần giặt tối đa");
      return;
    }
    if (customerRole.min_required === customerRole.max_required) {
      toast.error("Số lần giặt tối thiểu và tối đa không thể bằng nhau");
      return;
    }
    setLoading(true);
    try {
      await updateCustomerRole(false, customerRole.id, {
        ...customerRoleInput,
      });
      toast.success("Cập nhật danh hiệu thành công");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating customer role:", error);
      toast.error(`Cập nhật thất bại - ${(error as any).response.data?.error || "Lỗi không xác định"}`);
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
          <h2 className="text-xl font-bold text-[#f6b100]">Cập nhật danh hiệu</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 mt-2 text-sm">Tên danh hiệu</label>
          <input
            type="text"
            value={customerRoleInput.name}
            onChange={(e) =>
              setCustomerRoleInput({ ...customerRoleInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Mô tả</label>
          <input
            type="text"
            value={customerRoleInput.description || ""}
            onChange={(e) =>
              setCustomerRoleInput({ ...customerRoleInput, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Số lần giặt tối thiểu</label>
          <input
            type="number"
            value={customerRoleInput.min_required || 0}
            onChange={(e) =>
              setCustomerRoleInput({
                ...customerRoleInput,
                min_required: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Số lần giặt tối đa</label>
          <input
            type="number"
            value={customerRoleInput.max_required || 0}
            onChange={(e) =>
              setCustomerRoleInput({
                ...customerRoleInput,
                max_required: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang sửa..." : "Cập nhật"}
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
