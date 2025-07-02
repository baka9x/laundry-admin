"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { createService } from "@/services/service";
import toast from "react-hot-toast";
import { ServiceInput } from "@/types/service";

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
      setNewService({ name: "", description: "" });
      onAdd();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Thêm dịch vụ thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-xl w-80 space-y-4">
          <div className="text-[#f5f5f5] text-lg font-semibold">
            Thêm dịch vụ
          </div>
          <input
            type="text"
            placeholder="Tên dịch vụ"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
            >
              Huỷ
            </button>
            <button
              onClick={handleAdd}
              disabled={loading}
              className="px-3 py-1 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
