"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { Material } from "@/types/material";
import { updateMaterialBatch } from "@/services/materialBatch";

interface UpdateMaterialDialogProps {
  open: boolean;
  onClose: () => void;
  material: Material;
  onUpdate: () => void;
}

export default function UpdateMaterialDialog({ open, onClose, material, onUpdate }: UpdateMaterialDialogProps) {
  const [batchId, setBatchId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [importPrice, setImportPrice] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const batch_id = parseInt(batchId);
    const quantityNum = parseFloat(quantity);
    const importPriceNum = parseFloat(importPrice);

    if (!batch_id || quantityNum <= 0 || importPriceNum <= 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin hợp lệ");
      return;
    }

    try {
      await updateMaterialBatch(false, batch_id, {
        material_id: material.id,
        quantity: quantityNum,
        import_price: importPriceNum,
        remaining_quantity: quantityNum,
      });
      toast.success("Cập nhật nguyên liệu thành công");
      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật nguyên liệu thất bại");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-xl w-96 space-y-4">
          <Dialog.Title className="text-[#f5f5f5] text-lg font-semibold">
            Cập nhật nguyên liệu: {material.name}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#ababab] text-sm">ID Lô</label>
              <input
                type="number"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2 mt-1"
                placeholder="Nhập ID lô"
                required
              />
            </div>
            <div>
              <label className="text-[#ababab] text-sm">Số lượng (kg)</label>
              <input
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2 mt-1"
                placeholder="Nhập số lượng"
                required
              />
            </div>
            <div>
              <label className="text-[#ababab] text-sm">Giá nhập (VNĐ)</label>
              <input
                type="number"
                step="0.01"
                value={importPrice}
                onChange={(e) => setImportPrice(e.target.value)}
                className="w-full bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2 mt-1"
                placeholder="Nhập giá nhập"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-yellow-500 text-[#f5f5f5] rounded hover:bg-yellow-600"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}