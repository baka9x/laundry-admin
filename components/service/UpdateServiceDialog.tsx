"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { updateService } from "@/services/service";
import toast from "react-hot-toast";
import { Service, ServiceInput } from "@/types/service";
import { IoClose } from "react-icons/io5";

interface UpdateServiceDialogProps {
  open: boolean;
  onClose: () => void;
  service: Service;
  onUpdate: () => void;
}

export default function UpdateServiceDialog({
  open,
  onClose,
  service,
  onUpdate,
}: UpdateServiceDialogProps) {
  const [updateServiceInput, setUpdateServiceInput] = useState<ServiceInput>({
    name: service.name,
    description: service.description,
    type: service.type,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setUpdateServiceInput({
        name: service.name,
        description: service.description,
        type : service.type,
      });
    }
  }, [service]);

  const handleUpdate = async () => {
    if (updateServiceInput.name.trim() === "") {
      toast.error("Vui lòng nhập tên dịch vụ");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo dịch vụ
      const result = await updateService(false, service.id, updateServiceInput);
      toast.success("Cập nhật dịch vụ thành công");
      setUpdateServiceInput({ name: "", description: "", type: "" });
      onUpdate();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Cập nhật dịch vụ thất bại");
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
            Sửa dịch vụ
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
            value={updateServiceInput.name}
            onChange={(e) =>
              setUpdateServiceInput({ ...updateServiceInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 text-sm">Mô tả</label>
          <input
            type="text"
            placeholder="Mô tả dịch vụ"
            value={updateServiceInput.description}
            onChange={(e) =>
              setUpdateServiceInput({ ...updateServiceInput, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Kiểu dịch vụ</label>
          <select
            value={updateServiceInput.type}
            onChange={(e) =>
              setUpdateServiceInput({
                ...updateServiceInput,
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
