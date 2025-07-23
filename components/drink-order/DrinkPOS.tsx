"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  IoAdd,
  IoCheckmarkCircle,
  IoPricetag,
  IoTrash,
} from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { ServicesResponse } from "@/types/service";
import { getServices } from "@/services/service";
import { getProducts } from "@/services/product";
import { formatVND } from "@/lib/formatVND";
import InvoiceModal from "./InvoiceModal";
import { createDrinkOrderItem } from "@/services/drinkOrderItem";
import { createDrinkOrder, getDrinkOrderByID } from "@/services/drinkOrder";
import { DrinkOrderDetailResponse } from "@/types/drinkOrder";

interface Props {
  products: Product[];
}

export default function DrinkPOS({ products }: Props) {
  const router = useRouter();
  const [services, setServices] = useState<ServicesResponse | null>(null);
  const [localItems, setLocalItems] = useState<any[]>([]); // any[] => bạn có thể định nghĩa rõ hơn
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [productList, setProductList] = useState<Product[]>(products);
  const [showInvoice, setShowInvoice] = useState(false);

  const [order, setOrder] = useState<DrinkOrderDetailResponse | null>(null);

  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(null);

  // const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  // const [showPromotionDialog, setShowPromotionDialog] = useState(false);

  const fetchProductsByService = async (serviceId: number | null) => {
    try {
      const res = await getProducts(false, {
        type: "drink",
        service_id: serviceId ?? undefined,
        limit: 100,
      });
      setProductList(res.data); // res.data là mảng sản phẩm
      setSelectedServiceId(serviceId);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await getServices(false, { type: "drink", limit: 20 });
      if (!res) {
        return;
      }
      setServices(res);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  }

  const fetchCurrentOrder = async (id: number) => {
    try {
      const res = await getDrinkOrderByID(false, id); // Thay bằng ID thực tế
      console.log(res)
      if (res) {
        setOrder(res);
        setSelectedCustomer(res.customer ? res.customer.id : null);
        setSelectedPromotion(res.promotion ? res.promotion.id : null);
      }
    } catch (error) {
      console.error("Error fetching current order:", error);
      toast.error("Không lấy được đơn hàng hiện tại");
    }
  };


  useEffect(() => {
    fetchServices();
  }, []);


  const subtotal = useMemo(
    () => localItems.reduce((sum, item) => sum + item.subtotal, 0),
    [localItems]
  );

  const discount = useMemo(
    () =>
      order && order.promotion
        ? order.promotion.discount_type === "percentage"
          ? subtotal * (order.promotion.discount_value / 100)
          : order.promotion.discount_value
        : 0,
    [subtotal, order?.promotion]
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

      // Create order object
      const res = await createDrinkOrder({
        user_id: 1, // Thay bằng user_id thực tế
        order_date: new Date(),
        customer_id: selectedCustomer || null,
        total_amount: total,
        promotion_id: selectedPromotion || null,
        status: "deliveried",
      });
      if (!res || !res.order_id) {
        throw new Error("Failed to create order");
      }
      fetchCurrentOrder(res.order_id);

      if (res.order_id && typeof res.order_id === "number") {
        for (const item of localItems) {
          await createDrinkOrderItem({
            order_id: res.order_id,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            subtotal: item.subtotal,
          });
        }
      } else {
        throw new Error("Order ID is missing or invalid.");
      }
      toast.success("Đã thanh toán thành công!");
      setShowInvoice(true); // mở dialog
      //router.refresh(); // vẫn có thể refresh sau
      // await createNotification(false, {
      //   title: `Đơn hàng #${order.id} - ${order.customer.phone} (${order.customer.name}) đã thanh toán và giao cho khách.`,
      //   content: `Đơn hàng #${order.id} - 
      //             SDT: ${order.customer.phone} (${order.customer.name})
      //             pickup_time: ${order.pickup_time} - 
      //             Tổng giá tiền (Tạm tính): ${formatVND(order.total_amount)}`,
      //   type: "order",
      // });

    } catch (e) {
      console.error(e);
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <>
      <div className="bg-[#1f1f1f] rounded-xl shadow-lg overflow-hidden text-[#f5f5f5] mt-2 mb-5">
        <div className="flex flex-col md:flex-row">
          {/* Order Section */}
          <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-[#444] bg-[#262626]">
            <div className="p-4 border-b border-[#444]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#f6b100]">
                  Đơn hiện tại
                </h2>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  #NAH
                </span>
              </div>
              {/* <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setShowCustomerDialog(true)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-[#1f1f1f] py-2 px-4 rounded-lg transition">
                  <IoPerson className="inline mr-2" /> Chọn khách hàng
                </button>

                <button
                  onClick={() => setShowPromotionDialog(true)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
                  <IoPricetag className="inline mr-2" /> Chọn Khuyến mại
                </button>
              </div> */}
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
                        <div className="flex flex-col items-start gap-0.5">

                          <h4 className="font-bold text-[#f5f5f5] tracking-wide">
                            {item.product?.name || "N/A"}
                          </h4>
                          <span className="text-sm text-yellow-500 font-bold tracking-wide">{item.unit_price.toLocaleString()} đ /{" "}
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
                          <input
                            type="number"
                            min={0.01}
                            step="0.01"
                            className="mx-2 w-12 text-center bg-gray-800 text-white rounded"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) updateQuantity(item.product_id, value);
                            }}
                          />
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-[#444] space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Tạm tính</span>
                <span className="font-medium">{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Giảm giá</span>
                <span className="font-medium">{formatVND(discount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Thuế</span>
                <span className="font-medium">0 đ</span>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-[#444]">
                <span className="text-lg font-semibold">Tổng</span>
                <span className="text-lg font-semibold text-yellow-500">
                  {formatVND(total)}
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
                  disabled={localItems.length === 0}
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
                  Dịch vụ đồ uống
                </h2>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => fetchProductsByService(null)}
                    className={`px-3 py-1 rounded-full text-sm font-medium 
      ${selectedServiceId === null
                        ? "bg-yellow-500 text-[#1f1f1f]"
                        : "bg-[#444] text-[#f5f5f5] hover:bg-[#555]"}
    `}
                  >
                    Tất cả
                  </button>
                  {services && services.data.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => fetchProductsByService(service.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium 
        ${selectedServiceId === service.id
                          ? "bg-yellow-500 text-[#1f1f1f]"
                          : "bg-[#444] text-[#f5f5f5] hover:bg-[#555]"}
      `}
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productList.map((product) => (
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
                          {formatVND(product.price)}
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

      {showInvoice && (
        <InvoiceModal
          show={showInvoice}
          onClose={() => {
            setShowInvoice(false);
            clearOrder();
            router.refresh();
          }}
          items={localItems}
          subtotal={subtotal}
          discount={discount}
          total={total}
          orderId={order && order.id}
          customerName="Khách mua đồ uống"
          customerPhone="XXX"
        />
      )}
    </>
  );
}
