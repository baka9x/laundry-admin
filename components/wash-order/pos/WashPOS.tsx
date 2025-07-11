"use client";
import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { WashOrderDetailResponse } from "@/types/washOrder";
import { useRouter } from "next/navigation";
import { createWashOrderItem } from "@/services/washOrderItem";
import toast from "react-hot-toast";
import { updateWashOrderTotalPrice } from "@/services/washOrder";
import {
  IoAdd,
  IoCheckmarkCircle,
  IoPerson,
  IoPricetag,
  IoTrash,
} from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  order: WashOrderDetailResponse;
  products: Product[];
}

export default function WashPOS({ order, products }: Props) {
  const router = useRouter();

  const [localItems, setLocalItems] = useState<any[]>([]); // any[] => bạn có thể định nghĩa rõ hơn

  const subtotal = useMemo(
    () => localItems.reduce((sum, item) => sum + item.subtotal, 0),
    [localItems]
  );

  const discount = useMemo(
    () =>
      order.promotion
        ? order.promotion.discount_type === "percentage"
          ? subtotal * (order.promotion.discount_value / 100)
          : order.promotion.discount_value
        : 0,
    [subtotal, order.promotion]
  );

  const total = subtotal - discount;

  const addItem = (product: Product) => {
    setLocalItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.unit_price,
              }
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
        },
      ];
    });
  };

  const updateQuantity = (productId: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(productId);
    } else {
      setLocalItems((prev) =>
        prev.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: newQty, subtotal: newQty * item.unit_price }
            : item
        )
      );
    }
  };

  const removeItem = (productId: number) => {
    setLocalItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
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
      <div className="bg-[#1f1f1f] rounded-xl shadow-lg overflow-hidden text-[#f5f5f5] mt-6">
        <div className="flex flex-col md:flex-row">
          {/* Order Section */}
          <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-[#444] bg-[#262626]">
            <div className="p-4 border-b border-[#444]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#f6b100]">
                  Đơn hiện tại
                </h2>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  #{order.id}
                </span>
              </div>
              <div className="mt-4 flex space-x-2">
                <p className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-[#1f1f1f] py-2 px-4 rounded-lg transition">
                  <IoPerson className="inline mr-2" /> {order.customer.phone} (
                  {order.customer.name})
                </p>
                {/* <p className="flex-1 bg-[#444] hover:bg-[#555] text-[#f5f5f5] py-2 px-4 rounded-lg transition">
                <IoPricetag className="inline mr-2" /> Giảm giá
              </p> */}
              </div>
            </div>

            <div className="p-4 border-b border-[#444]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Sản phẩm</span>
                <span className="text-gray-400">SL</span>
              </div>
              <div className="max-h-96 overflow-y-auto scrollbar-hide">
                <div className="text-center py-2 text-gray-500">
                  {localItems.length === 0 && (
                    <>
                      <IoPricetag className="text-4xl mb-2 mx-auto" />
                      <p>Chưa có sản phẩm</p>
                    </>
                  )}
                  {localItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-[#444] bg-[#1f1f1f]"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-[#f5f5f5] tracking-wide">
                            {item.product?.name || "N/A"}
                          </h4>
                          <span className="text-sm text-gray-500 tracking-wide">{item.unit_price.toLocaleString()}đ /{" "}
                          {item.product?.unit}</span>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity - 1)
                            }
                            className="decrease-quantity w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center"
                          >
                            <BiMinus />
                          </button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, item.quantity + 1)
                            }
                            className="increase-quantity w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center"
                          >
                            <BiPlus />
                          </button>
                          <button
                            onClick={() => removeItem(item.product_id)}
                            className="remove-item ml-3 text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                      {/* <div>
                        <div className="font-medium">
                          {item.product?.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.unit_price.toLocaleString()} đ /{" "}
                          {item.product?.unit}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product_id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product_id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <button onClick={() => removeItem(item.product_id)}>
                          🗑
                        </button>
                      </div> */}

                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-[#444] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Tạm tính</span>
                <span className="font-medium">{subtotal.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Giảm giá</span>
                <span className="font-medium">{discount.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Thuế</span>
                <span className="font-medium">0 đ</span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-[#444]">
                <span className="text-lg font-semibold">Tổng</span>
                <span className="text-lg font-semibold text-yellow-500">
                  {total.toLocaleString()} đ
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <button 
                onClick={clearOrder}
                className="bg-[#444] hover:bg-[#555] text-[#f5f5f5] py-3 px-4 rounded-lg transition font-medium">
                  <IoTrash className="inline mr-2" /> Xoá hết
                </button>
                <button 
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition font-medium">
                  <IoCheckmarkCircle className="inline mr-2" /> Thanh toán
                </button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full md:w-3/5">
            <div className="p-4 border-b border-[#444]">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h2 className="text-xl font-semibold text-[#f6b100]">
                  Dịch vụ giặt ủi
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["Tất cả", "Giặt", "Ủi", "Hấp"].map((label, idx) => (
                    <button
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm font-medium 
                                ${
                                  idx === 0
                                    ? "bg-yellow-500 text-[#1f1f1f]"
                                    : "bg-[#444] text-[#f5f5f5] hover:bg-[#555]"
                                }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {products.map((product) => (
                  <div
                  onClick={() => addItem(product)}
                    key={product.id}
                    className="bg-[#2a2a2a] border border-[#444] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="p-4 flex flex-col justify-between h-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-400">Mô tả ngắn</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          {product.unit}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-lg font-semibold text-yellow-500">
                          {product.price.toLocaleString()} đ 
                        </span>
                        <button className="bg-yellow-100 text-yellow-800 p-2 rounded-full hover:bg-yellow-200 transition">
                          <IoAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
