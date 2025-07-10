"use client";
import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { WashOrderDetailResponse } from "@/types/washOrder";
import { useRouter } from "next/navigation";
import { createWashOrderItem } from "@/services/washOrderItem";
import toast from "react-hot-toast";
import { updateWashOrderTotalPrice } from "@/services/washOrder";


interface Props {
  order: WashOrderDetailResponse;
  products: Product[];
}

export default function WashPOS({ order, products }: Props) {
  const router = useRouter();

  const [localItems, setLocalItems] = useState<any[]>([]); // any[] => bạn có thể định nghĩa rõ hơn

  const subtotal = useMemo(() =>
    localItems.reduce((sum, item) => sum + item.subtotal, 0), [localItems]
  );

  const discount = useMemo(() =>
    order.promotion
      ? order.promotion.discount_type === "percentage"
        ? subtotal * (order.promotion.discount_value / 100)
        : order.promotion.discount_value
      : 0
  , [subtotal, order.promotion]);

  const total = subtotal - discount;

  const addItem = (product: Product) => {
    setLocalItems(prev => {
      const existing = prev.find(item => item.product_id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.unit_price }
            : item
        );
      }
      return [
        ...prev,
        {
          id: Date.now(), // id tạm
          product_id: product.id,
          product,
          quantity: 1,
          unit_price: product.price,
          subtotal: product.price,
        }
      ];
    });
  };

  const updateQuantity = (productId: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(productId);
    } else {
      setLocalItems(prev =>
        prev.map(item =>
          item.product_id === productId
            ? { ...item, quantity: newQty, subtotal: newQty * item.unit_price }
            : item
        )
      );
    }
  };

  const removeItem = (productId: number) => {
    setLocalItems(prev => prev.filter(item => item.product_id !== productId));
  };

  const clearOrder = () => setLocalItems([]);

  const handleCheckout = async () => {
    try {
      for (const item of localItems) {
        await createWashOrderItem({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.subtotal,
        });
      }

      await updateWashOrderTotalPrice(order.id, total);
      toast.success("Đã thêm sản phẩm vào đơn giặt!");
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <div className="flex px-4 py-6">
      {/* Left: Order Summary */}
      <div className="w-2/5 bg-gray-50 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Đơn giặt #{order.id}</h2>
          <p className="text-sm text-gray-500">Khách: {order.customer.name} | SDT: {order.customer.phone}</p>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto max-h-[50vh]">
          {localItems.length === 0 && <p className="text-gray-400">Chưa có sản phẩm</p>}
          {localItems.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
              <div>
                <div className="font-medium">{item.product?.name || 'N/A'}</div>
                <div className="text-xs text-gray-500">{item.unit_price.toLocaleString()} đ / {item.product?.unit}</div>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>
                <button onClick={() => removeItem(item.product_id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-1">
          <div className="flex justify-between"><span>Tạm tính</span><span>{subtotal.toLocaleString()} đ</span></div>
          <div className="flex justify-between"><span>Giảm giá</span><span>{discount.toLocaleString()} đ</span></div>
          <div className="flex justify-between font-semibold text-lg"><span>Tổng</span><span className="text-blue-600">{total.toLocaleString()} đ</span></div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="bg-gray-200 p-2 rounded" onClick={clearOrder}>Xoá hết</button>
            <button className="bg-green-600 text-white p-2 rounded" onClick={handleCheckout}>Thanh toán</button>
          </div>
        </div>
      </div>

      {/* Right: Products */}
      <div className="w-3/5 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Dịch vụ giặt</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {products.map(product => (
            <div key={product.id} className="border p-2 rounded shadow cursor-pointer hover:shadow-md"
              onClick={() => addItem(product)}>
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">{product.price.toLocaleString()} đ / {product.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
