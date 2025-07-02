import { OrderInput, OrdersResponse } from "@/types/order";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createOrder = async (input: OrderInput) => {
  const response = await api.post("/auth/orders", input);
  return response.data;
};

export const getOrders = async (
  isServer = false,
  params: { status?: string; date?: string, page?: number; limit?: number }
): Promise<OrdersResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/orders", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/orders", { params });
    return response.data;
  }
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const response = await api.put(`/auth/orders/${orderId}/status`, { status });
  return response.data;
};