"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { createService } from "@/services/service";
import toast from "react-hot-toast";
import { ServiceInput } from "@/types/service";
import { IoClose } from "react-icons/io5";

interface CreateServiceDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreateServiceDialog({
  open,
  onClose,
  onAdd,
}: CreateServiceDialogProps) {
  const [newService, setNewService] = useState<ServiceInput>({
    name: "",
    description: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (newService.name.trim() === "") {
      toast.error("Vui lòng nhập tên dịch vụ");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo dịch vụ
      const result = await createService(false, newService);
      toast.success("Thêm dịch vụ thành công");
      setNewService({ name: "", description: "", type: "" });
      onAdd();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Thêm dịch vụ thất bại");
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
          <h2 className="text-xl font-bold text-[#f6b100]">
            Tạo dịch vụ mới
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Tên dịch vụ</label>
          <input
            type="text"
            placeholder="Tên dịch vụ"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 text-sm">Mô tả</label>
          <input
            type="text"
            placeholder="Mô tả dịch vụ"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Kiểu dịch vụ</label>
          <select
            value={newService.type || ""}
            onChange={(e) =>
              setNewService({
                ...newService,
                type: e.target.value as "wash" | "drink",
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            <option value="wash">Giặt</option>
            <option value="drink">Đồ uống</option>
          </select>
          

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
