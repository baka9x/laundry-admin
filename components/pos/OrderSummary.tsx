'use client';
import React, { useMemo } from 'react';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: Item[];
  onOpenPayment: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, onOpenPayment }) => {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const promotion = total >= 100000 ? 10000 : 0;
  const shippingFee = total >= 50000 ? 0 : 10000;
  const finalTotal = total - promotion + shippingFee;

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name} x{item.quantity}</span>
            <span>{(item.price * item.quantity).toLocaleString()}đ</span>
          </div>
        ))}
      </div>

      <div className="text-sm text-[#ababab] space-y-1">
        <div className="flex justify-between">
          <span>Tạm tính:</span>
          <span>{total.toLocaleString()}đ</span>
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

      <div className="flex justify-between text-lg font-semibold border-t border-[#444] pt-2 mt-2">
        <span>Tổng cộng:</span>
        <span className="text-green-400">{finalTotal.toLocaleString()}đ</span>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onOpenPayment}
          className="bg-[#f6b100] text-black py-2 px-4 rounded font-semibold"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;