// components/OrderSummary.tsx
import { WashOrderDetailResponse } from "@/types/washOrder";

export default function OrderSummary({ order }: { order: WashOrderDetailResponse }) {
  const items = order.wash_order_items || [];

  // Tính subtotal từ tất cả item
  const subtotal = items.reduce(
    (sum: number, item: any) => sum + Number(item.subtotal),
    0
  );

  // Tính discount
  let discount = 0;
  if (order.promotion) {
    if (order.promotion.discount_type === "percentage") {
      discount = subtotal * (order.promotion.discount_value / 100);
    } else if (order.promotion.discount_type === "fixed") {
      discount = order.promotion.discount_value;
    }
  }

  const tax = 0; // ví dụ: bạn có thể thêm VAT sau
  const total = subtotal - discount + tax;

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex justify-between mb-1">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{subtotal.toLocaleString("vi-VN")} đ</span>
      </div>

      <div className="flex justify-between mb-1">
        <span className="text-gray-600">Discount</span>
        <span className="font-medium">- {discount.toLocaleString("vi-VN")} đ</span>
      </div>

      <div className="flex justify-between mb-1">
        <span className="text-gray-600">Tax</span>
        <span className="font-medium">{tax.toLocaleString("vi-VN")} đ</span>
      </div>

      <div className="flex justify-between mt-3 pt-3 border-t border-gray-200">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold text-blue-600">
          {total.toLocaleString("vi-VN")} đ
        </span>
      </div>
    </div>
  );
}
