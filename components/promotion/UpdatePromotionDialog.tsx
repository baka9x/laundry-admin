"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Promotion, PromotionInput } from "@/types/promotion";
import { updatePromotion } from "@/services/promotion";
import { IoClose } from "react-icons/io5";

interface UpdatePromotionDialogProps {
  open: boolean;
  onClose: () => void;
  promotion: Promotion;
  onUpdate: () => void;
}

export default function UpdatePromotionDialog({
  open,
  onClose,
  promotion,
  onUpdate,
}: UpdatePromotionDialogProps) {
  const [promotionInput, setPromotionInput] = useState<PromotionInput>({
    name: "",
    discount_type: "percentage",
    discount_value: 0,
    min_order_value: 0,
    priority_level_required: 0,
    start_date: new Date(),
    end_date: new Date(),
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (promotion) {
      setPromotionInput({
        name: promotion.name,
        discount_type: promotion.discount_type,
        discount_value: promotion.discount_value,
        min_order_value: promotion.min_order_value,
        priority_level_required: promotion.priority_level_required ?? 0,
        start_date: new Date(promotion.start_date),
        end_date: new Date(promotion.end_date),
        is_active: promotion.is_active,
      });
      setStartDate(new Date(promotion.start_date).toISOString().slice(0,16));
      setEndDate(new Date(promotion.end_date).toISOString().slice(0,16));
    }
  }, [promotion]);

  const handleUpdate = async () => {
    if (promotionInput.name.trim() === "") {
      toast.error("Vui lòng nhập tên khuyến mại");
      return;
    }
    setLoading(true);
    try {
      await updatePromotion(false, promotion.id, {
        ...promotionInput,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
      });
      toast.success("Cập nhật khuyến mại thành công");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating promotion:", error);
      toast.error("Cập nhật khuyến mại thất bại");
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
          <h2 className="text-xl font-bold text-[#f6b100]">Cập nhật khuyến mại</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Tên khuyến mại</label>
          <input
            type="text"
            value={promotionInput.name}
            onChange={(e) =>
              setPromotionInput({ ...promotionInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Kiểu khuyến mại</label>
          <select
            value={promotionInput.discount_type}
            onChange={(e) =>
              setPromotionInput({
                ...promotionInput,
                discount_type: e.target.value as "percentage" | "fixed",
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            <option value="percentage">Phần trăm</option>
            <option value="fixed">Cố định</option>
          </select>
          <label className="block mb-1 mt-2 text-sm">Giá trị giảm</label>
          <input
            type="number"
            value={promotionInput.discount_value}
            onChange={(e) =>
              setPromotionInput({
                ...promotionInput,
                discount_value: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Đơn hàng tối thiểu</label>
          <input
            type="number"
            value={promotionInput.min_order_value}
            onChange={(e) =>
              setPromotionInput({
                ...promotionInput,
                min_order_value: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Yêu cầu VIP</label>
          <input
            type="number"
            value={promotionInput.priority_level_required}
            onChange={(e) =>
              setPromotionInput({
                ...promotionInput,
                priority_level_required: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <div className="flex flex-col mt-2 mb-1 md:flex-row gap-2">
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-sm">Ngày bắt đầu</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 rounded bg-[#343434] text-white"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-sm">Ngày kết thúc</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 rounded bg-[#343434] text-white"
              />
            </div>
          </div>
          <select
            value={promotionInput.is_active ? "true" : "false"}
            onChange={(e) =>
              setPromotionInput({
                ...promotionInput,
                is_active: e.target.value === "true",
              })
            }
            className="w-full px-3 py-2 mt-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            <option value="true">Kích hoạt</option>
            <option value="false">Không kích hoạt</option>
          </select>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex-1 px-3 py-1 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
