"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { getMaterials } from "@/services/material";
import { Material } from "@/types/material";
import { createMaterialBatch } from "@/services/materialBatch";
import { IoClose } from "react-icons/io5";

interface CreateMaterialDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreateMaterialDialog({ open, onClose, onAdd }: CreateMaterialDialogProps) {
  const [materialId, setMaterialId] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [importPrice, setImportPrice] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);

  // Tải danh sách nguyên liệu khi dialog mở
  useEffect(() => {
    if (open) {
      const fetchMaterials = async () => {
        setLoading(true);
        try {
          const response = await getMaterials(false, { limit: 100 });
          setMaterials(response.data || []);
        } catch (err) {
          console.error("Error fetching materials:", err);
          toast.error("Lỗi khi tải danh sách nguyên liệu");
        } finally {
          setLoading(false);
        }
      };
      fetchMaterials();
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const material_id = parseInt(materialId);
    const quantityNum = parseFloat(quantity);
    const importPriceNum = parseFloat(importPrice);

    if (material_id <= 0 || quantityNum <= 0 || importPriceNum <= 0) {
      toast.error("Vui lòng chọn nguyên liệu và nhập đầy đủ thông tin hợp lệ");
      return;
    }

    try {
      await createMaterialBatch(false, {
        material_id,
        quantity: quantityNum,
        import_price: importPriceNum,
        remaining_quantity: quantityNum,
      });
      toast.success("Thêm nguyên liệu thành công");
      setMaterialId("0");
      setQuantity("");
      setImportPrice("");
      onAdd();
    } catch (err) {
      console.error(err);
      toast.error("Thêm nguyên liệu thất bại");
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
            Thêm nguyên liệu vào kho
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-[#ababab]">Nguyên liệu</label>
            {loading ? (
              <p className="text-[#8ecae6] text-sm">Đang tải nguyên liệu...</p>
            ) : materials.length === 0 ? (
              <p className="text-red-400 text-sm">Không có nguyên liệu nào</p>
            ) : (
              <select
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
                required
              >
                <option value="0" disabled>
                  Chọn nguyên liệu
                </option>
                {materials.map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name} ({material.unit})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#ababab]">Số lượng</label>
            <input
              type="number"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
              placeholder="Nhập số lượng"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#ababab]">Giá nhập (VNĐ)</label>
            <input
              type="number"
              step="0.01"
              value={importPrice}
              onChange={(e) => setImportPrice(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
              placeholder="Nhập giá nhập"
              required
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all disabled:bg-yellow-700"
            >
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 p-2 bg-gray-500 text-[#f5f5f5] font-semibold rounded hover:bg-gray-600 transition-all disabled:bg-gray-700"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}