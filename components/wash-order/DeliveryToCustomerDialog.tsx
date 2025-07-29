"use client";

import { formatVND } from "@/lib/formatVND";
import { createNotification } from "@/services/notification";
import { updateWashOrderStatus } from "@/services/washOrder";
import { WashOrder } from "@/types/washOrder";
import { Dialog } from "@headlessui/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface DeliveryToCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  washOrder: WashOrder;
  onDelivery: () => void;
}

export default function CreateOrderDialog({
  isOpen,
  onClose,
  washOrder,
  onDelivery,
}: DeliveryToCustomerDialogProps) {
  const [cashGiven, setCashGiven] = useState<number | null>(null);
  
  const change = useMemo(() => {
    if (cashGiven === null) return 0;
    return Math.max(0, cashGiven - washOrder.total_amount);
  }, [cashGiven, washOrder.total_amount]);

  const handleDeliveried = async () => {
    try {
      await updateWashOrderStatus(washOrder.id, "deliveried");
      await createNotification(false, {
              title: `Đơn hàng #${washOrder.id} - ${washOrder.customer_phone} (${washOrder.customer_name}) đã giao cho khách.`,
              content: `Đơn hàng #${washOrder.id} - 
                        SDT: ${washOrder.customer_phone} (${washOrder.customer_name})
                        pickup_time: ${washOrder.updated_at} - 
                        Tổng giá tiền (Tạm tính): ${formatVND(washOrder.total_amount)}`,
              type: "order",
            });

      onClose();
      onDelivery && onDelivery();
      toast.success(`Đã nhận tiền và giao cho khách đơn hàng #${washOrder.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi cập nhật trạng thái");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-[#262626] text-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#f6b100]">
            Tính toán tiền trả khách
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Tiền đơn hàng</label>
          <input
            type="number"
            placeholder="Tiền đơn hàng"
            value={washOrder.total_amount}
            disabled={true}
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Tiền khách đưa</label>
          <input
            type="number"
            placeholder="Tiền khách đưa"
            value={cashGiven ?? ""}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setCashGiven(isNaN(value) ? null : value);
            }}
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <div className="flex justify-between items-center text-lg font-semibold">
            <span className="text-gray-400">Tiền thừa trả khách</span>
            <span
              className={`font-bold ${
                change >= 0 ? "text-green-400" : "text-red-500"
              }`}
            >
              {formatVND(change)}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleDeliveried}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              Xác nhận giao
            </button>
            <button
              onClick={onClose}
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
