"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { createService } from "@/services/service";
import toast from "react-hot-toast";
import { ServiceInput } from "@/types/service";
import { PromotionInput } from "@/types/promotion";
import { createPromotion } from "@/services/promotion";

interface CreatePromotionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreatePromotionDialog({
  open,
  onClose,
  onAdd,
}: CreatePromotionDialogProps) {
  const [newPromotion, setNewPromotion] = useState<PromotionInput>({
    name: "",
    discount_type: "percentage",
    discount_value: 0,
    min_order_value: 0,
    priority_level_required: null,
    start_date: "",
    end_date: "",
    is_active: false,
  });
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (newPromotion.name.trim() === "") {
      toast.error("Vui lòng nhập tên khuyến mại");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo dịch vụ
      const result = await createPromotion(false, newPromotion);
      toast.success("Thêm khuyến mại thành công");
      setNewPromotion({
        name: "",
        discount_type: "percentage",
        discount_value: 0,
        min_order_value: 0,
        priority_level_required: null,
        start_date: "",
        end_date: "",
        is_active: false,
      });
      onAdd();
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Thêm khuyến mại thất bại");
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
            placeholder="Tên khuyến mại"
            value={newPromotion.name}
            onChange={(e) =>
              setNewPromotion({ ...newPromotion, name: e.target.value })
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
