"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { PromotionInput } from "@/types/promotion";
import { createPromotion } from "@/services/promotion";
import { IoClose } from "react-icons/io5";

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
    priority_level_required: 0,
    total_washes_required: 0,
    start_date: new Date(),
    end_date: new Date(),
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAdd = async () => {
    if (newPromotion.name.trim() === "") {
      toast.error("Vui lòng nhập tên khuyến mại");
      return;
    }
    setLoading(true);
    try {
      await createPromotion(false, {
        name: newPromotion.name.trim(),
        discount_type: newPromotion.discount_type.trim(),
        discount_value: newPromotion.discount_value,
        min_order_value: newPromotion.min_order_value,
        priority_level_required: newPromotion.priority_level_required,
        total_washes_required: newPromotion.total_washes_required,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        is_active: newPromotion.is_active,
      });
      toast.success("Thêm khuyến mại thành công");
      setNewPromotion({
        name: "",
        discount_type: "percentage",
        discount_value: 0,
        min_order_value: 0,
        priority_level_required: 0,
        total_washes_required: 0,
        start_date: new Date(),
        end_date: new Date(),
        is_active: true,
      });
      onAdd();
      onClose();
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast.error("Thêm khuyến mại thất bại");
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
            Tạo khuyến mại mới
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Tên khuyến mại</label>
          <input
            type="text"
            placeholder="Tên khuyến mại"
            value={newPromotion.name}
            onChange={(e) =>
              setNewPromotion({ ...newPromotion, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Kiểu khuyến mại</label>
          <select
            value={newPromotion.discount_type}
            onChange={(e) =>
              setNewPromotion({
                ...newPromotion,
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
            placeholder="Giá trị giảm"
            value={newPromotion.discount_value}
            onChange={(e) =>
              setNewPromotion({
                ...newPromotion,
                discount_value: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <label className="block mb-1 mt-2 text-sm">Đơn hàng tối thiểu</label>
          <input
            type="number"
            placeholder="Đơn hàng tối thiểu"
            value={newPromotion.min_order_value}
            onChange={(e) =>
              setNewPromotion({
                ...newPromotion,
                min_order_value: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Kiểu khách hàng</label>
          <select
            value={newPromotion.priority_level_required}
            onChange={(e) =>
              setNewPromotion({
                ...newPromotion,
                priority_level_required: Number(e.target.value) as 0 | 1,
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            <option value="0">Khách hàng bình thường</option>
            <option value="1">Khách hàng thân thiết</option>
          </select>

          <label className="block mb-1 mt-2 text-sm">Số lần giặt</label>
          <input
            type="number"
            placeholder="Số lần giặt cần thiết"
            value={newPromotion.total_washes_required}
            onChange={(e) =>
              setNewPromotion({
                ...newPromotion,
                total_washes_required: Number(e.target.value),
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
            value={newPromotion.is_active ? "true" : "false"}
            onChange={(e) =>
              setNewPromotion({
                ...newPromotion,
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
