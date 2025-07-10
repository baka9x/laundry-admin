"use client";
import {
  deleteWashOrderItem,
  updateWashOrderItem,
} from "@/services/washOrderItem";
import { WashOrderItem } from "@/types/washOrderItem";
import { useState } from "react";

export default function OrderItemsList({
  items,
  onChange,
}: {
  items: WashOrderItem[];
  onChange: () => void; // callback khi thay đổi (để reload order)
}) {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleChangeQty = async (item: WashOrderItem, diff: number) => {
    if (item.quantity + diff <= 0) return;
    setLoadingId(item.id);
    try {
      await updateWashOrderItem(item.id, item.quantity + diff);
      onChange();
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (item: WashOrderItem) => {
    setLoadingId(item.id);
    try {
      await deleteWashOrderItem(item.id);
      onChange();
    } finally {
      setLoadingId(null);
    }
  };

  if (!items.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        <i className="fas fa-tshirt text-4xl mb-2"></i>
        <p>No items added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-2 bg-white rounded shadow"
        >
          {item.product ? (
            <>
              <div className="font-medium text-gray-800">
                {item.product.name}
              </div>
              <div className="text-xs text-gray-500">
                {item.unit_price.toLocaleString()} đ / {item.product.unit}
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-xs italic">
              Đang tải sản phẩm...
            </div>
          )}
          <div className="flex items-center space-x-1">
            <button
              disabled={loadingId === item.id}
              onClick={() => handleChangeQty(item, -1)}
              className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              disabled={loadingId === item.id}
              onClick={() => handleChangeQty(item, 1)}
              className="w-7 h-7 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              +
            </button>
            <button
              disabled={loadingId === item.id}
              onClick={() => handleDelete(item)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
