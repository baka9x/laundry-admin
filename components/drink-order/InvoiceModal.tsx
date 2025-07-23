"use client";

import React from "react";
import { formatVND } from "@/lib/formatVND";

interface InvoiceItem {
  id: number;
  product?: { name: string };
  quantity: number;
  subtotal: number;
}

interface InvoiceModalProps {
  show: boolean;
  onClose: () => void;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  total: number;
  orderId: number | null;
  customerName: string;
  customerPhone: string;
}

export default function InvoiceModal({
  show,
  onClose,
  items,
  subtotal,
  discount,
  total,
  orderId,
  customerName,
  customerPhone,
}: InvoiceModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 print:bg-transparent">
      <div
        id="invoice"
        className="bg-[#1f1f1f] text-[#f5f5f5] p-6 rounded-lg w-[90%] max-w-md relative print:bg-white print:text-black"
      >
        <h2 className="text-xl font-semibold mb-4">Hóa đơn thanh toán</h2>
        <div className="space-y-1 text-sm">
          <p>Đơn hàng: #{orderId}</p>
          <p>Khách hàng: {customerName} ({customerPhone})</p>
          <p>Ngày: {new Date().toLocaleString()}</p>
          <hr className="my-2 border-[#444]" />
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.product?.name} x{item.quantity}</span>
              <span>{formatVND(item.subtotal)}</span>
            </div>
          ))}
          <hr className="my-2 border-[#444]" />
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{formatVND(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Giảm giá:</span>
            <span>{formatVND(discount)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Tổng:</span>
            <span>{formatVND(total)}</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-yellow-500 text-[#1f1f1f] px-4 py-2 rounded hover:bg-yellow-600"
          >
            In
          </button>
          <button
            onClick={onClose}
            className="bg-[#444] text-[#f5f5f5] px-4 py-2 rounded hover:bg-[#555]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
