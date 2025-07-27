"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { createMaterial } from "@/services/material";
import toast from "react-hot-toast";
import { MaterialInput } from "@/types/material";
import { IoClose } from "react-icons/io5";

interface CreateMaterialBatchDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreateMaterialBatchDialog({
  open,
  onClose,
  onAdd,
}: CreateMaterialBatchDialogProps) {
  const [newMaterial, setNewMaterial] = useState<MaterialInput>({
    name: "",
    unit: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (newMaterial.name.trim() === "") {
      toast.error("Vui lòng nhập tên nguyên liệu");
      return;
    }

    if (newMaterial.unit.trim() === "") {
      toast.error("Vui lòng chọn đơn vị");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo nguyên liệu
      const result = await createMaterial(false, newMaterial);
      toast.success("Thêm nguyên liệu thành công");
      setNewMaterial({ name: "",  unit: "" });
      onAdd();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Thêm nguyên liệu thất bại");
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
            Tạo nguyên liệu mới
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Tên nguyên liệu</label>
          <input
            type="text"
            placeholder="Tên nguyên liệu"
            value={newMaterial.name}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Chọn đơn vị</label>
          <select
            value={newMaterial.unit}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, unit: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            <option value="">-- Chọn đơn vị --</option>
            <option value="cái">cái</option>
            <option value="g">gram</option>
            <option value="ml">ml</option>
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
