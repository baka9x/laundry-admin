'use client';
import React, { useMemo } from 'react';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface PaymentDialogProps {
  items: Item[];
  onClose: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ items, onClose }) => {
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const promotion = subtotal >= 100000 ? 10000 : 0;
  const shippingFee = subtotal >= 50000 ? 0 : 10000;
  const total = subtotal - promotion + shippingFee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2a2a2a] p-6 rounded-xl w-full max-w-md text-white shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Xác nhận thanh toán</h2>

        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between border-b border-[#444] pb-1">
              <span>{item.name} x{item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()}đ</span>
            </div>
          ))}
        </div>

        <div className="text-sm text-[#ababab] space-y-1 mb-2">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between">
            <span>Khuyến mãi:</span>
            <span>-{promotion.toLocaleString()}đ</span>
          </div>
          <div className="flex justify-between">
            <span>Phí giao hàng:</span>
            <span>{shippingFee.toLocaleString()}đ</span>
          </div>
        </div>

        <div className="flex justify-between font-semibold text-lg border-t border-[#444] pt-2 mb-4">
          <span>Tổng cộng:</span>
          <span className="text-green-400">{total.toLocaleString()}đ</span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm mb-1">Phương thức thanh toán</label>
          <select className="w-full bg-[#1f1f1f] text-white p-2 rounded">
            <option>Tiền mặt</option>
            <option>Chuyển khoản</option>
            <option>QR Code</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded bg-[#f6b100] text-black font-semibold hover:opacity-90"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDialog;
