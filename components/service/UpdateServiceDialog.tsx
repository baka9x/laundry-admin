"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { updateService } from "@/services/service";
import toast from "react-hot-toast";
import { Service, ServiceInput } from "@/types/service";

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
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setUpdateServiceInput({
        name: service.name,
        description: service.description,
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
      setUpdateServiceInput({ name: "", description: "" });
      onUpdate();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Cập nhật dịch vụ thất bại");
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
            Sửa dịch vụ
          </div>
          <input
            type="text"
            placeholder="Tên dịch vụ"
            value={updateServiceInput.name}
            onChange={(e) =>
              setUpdateServiceInput({ ...updateServiceInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={updateServiceInput.description}
            onChange={(e) =>
              setUpdateServiceInput({ ...updateServiceInput, description: e.target.value })
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
              onClick={handleUpdate}
              disabled={loading}
              className="px-3 py-1 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang sửa..." : "Cập nhật"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
