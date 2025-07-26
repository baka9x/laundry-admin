import { WashOrderItem, WashOrderItemInput } from "@/types/washOrderItem";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

// ✅ Tạo mới item trong đơn giặt
export const createWashOrderItem = async (input: WashOrderItemInput): Promise<WashOrderItem> => {
  const response = await api.post("/auth/wash-order-items", input);
  return response.data;
};

// ✅ Cập nhật item (ví dụ: số lượng hoặc đơn giá)
export const updateWashOrderItem1 = async (itemId: number, input: Partial<WashOrderItemInput>): Promise<WashOrderItem> => {
  const response = await api.put(`/auth/wash-order-items/${itemId}`, input);
  return response.data;
};

export const updateWashOrderItem = async (itemId: number, quantity: number) => {
  const res = await api.put(`/auth/wash-order-items/${itemId}`, { quantity });
  return res.data;
};

// ✅ Xoá item khỏi đơn giặt
export const deleteWashOrderItem = async (itemId: number): Promise<void> => {
  await api.delete(`/auth/wash-order-items/${itemId}`);
};

// ✅ Lấy danh sách item theo order_id
export const getWashOrderItemsByOrderID = async (
  isServer = false,
  orderId: number
): Promise<WashOrderItem[]> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get(`/auth/wash-order-items/order/${orderId}`);
    return response.data;
  } else {
    const response = await api.get(`/auth/wash-order-items/order/${orderId}`);
    return response.data;
  }
};

export const deleteAllWashItemsByOrderID = async (
  isServer = false,
  orderId: number
): Promise<void> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/wash-order-items/order/${orderId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/wash-order-items/order/${orderId}`);
    return response.data;
  }
};