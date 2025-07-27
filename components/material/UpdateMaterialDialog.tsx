"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { updateMaterial } from "@/services/material";
import toast from "react-hot-toast";
import { Material, MaterialInput } from "@/types/material";
import { IoClose } from "react-icons/io5";

interface UpdateMaterialDialogProps {
  open: boolean;
  onClose: () => void;
  material: Material;
  onUpdate: () => void;
}

export default function UpdateMaterialDialog({
  open,
  onClose,
  material,
  onUpdate,
}: UpdateMaterialDialogProps) {
  const [updateMaterialInput, setUpdateMaterialInput] = useState<MaterialInput>({
    name: material.name,
    unit: material.unit
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (material) {
      setUpdateMaterialInput({
        name: material.name,
        unit: material.unit,
      });
    }
  }, [material]);

  const handleUpdate = async () => {
    if (updateMaterialInput.name.trim() === "") {
      toast.error("Vui lòng nhập tên nguyên liệu");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo nguyên liệu
      const result = await updateMaterial(false, material.id, updateMaterialInput);
      toast.success("Cập nhật nguyên liệu thành công");
      setUpdateMaterialInput({ name: "", unit: "" });
      onUpdate();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Cập nhật nguyên liệu thất bại");
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
            Sửa nguyên liệu
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
            value={updateMaterialInput.name}
            onChange={(e) =>
              setUpdateMaterialInput({ ...updateMaterialInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Chọn đơn vị</label>
          <select
            value={updateMaterialInput.unit}
            onChange={(e) =>
              setUpdateMaterialInput({ ...updateMaterialInput, unit: e.target.value })
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
