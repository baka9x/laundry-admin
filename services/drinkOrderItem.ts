import { DrinkOrderItem, DrinkOrderItemInput, TopDrinkOrderItemsResponse } from "@/types/drinkOrderItem";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

// ✅ Tạo mới item trong đơn giặt
export const createDrinkOrderItem = async (input: DrinkOrderItemInput): Promise<DrinkOrderItem> => {
  const response = await api.post("/auth/drink-order-items", input);
  return response.data;
};

// ✅ Cập nhật item (ví dụ: số lượng hoặc đơn giá)
export const updateDrinkOrderItem1 = async (itemId: number, input: Partial<DrinkOrderItemInput>): Promise<DrinkOrderItem> => {
  const response = await api.put(`/auth/drink-order-items/${itemId}`, input);
  return response.data;
};

export const updateDrinkOrderItem = async (itemId: number, quantity: number) => {
  const res = await api.put(`/auth/drink-order-items/${itemId}`, { quantity });
  return res.data;
};

// ✅ Xoá item khỏi đơn giặt
export const deleteDrinkOrderItem = async (itemId: number): Promise<void> => {
  await api.delete(`/auth/drink-order-items/${itemId}`);
};

// ✅ Lấy danh sách item theo order_id
export const getDrinkOrderItemsByOrderID = async (
  isServer = false,
  orderId: number
): Promise<DrinkOrderItem[]> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get(`/auth/drink-order-items/order/${orderId}`);
    return response.data;
  } else {
    const response = await api.get(`/auth/drink-order-items/order/${orderId}`);
    return response.data;
  }
};

export const getTopDrinkOrderItems = async (
  isServer: boolean,
  params: { date?: string, startDate?: string, endDate?: string, page?: number, limit?: number }
): Promise<TopDrinkOrderItemsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/drink-order-items/top-orders", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/drink-order-items/top-orders", { params });
    return response.data;
  }
}
