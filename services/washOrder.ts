import {
  WashOrdersResponse,
  WashOrderInput,
  WashOrderDetailResponse,
} from "@/types/washOrder";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createWashOrder = async (input: WashOrderInput) => {
  const response = await api.post("/auth/wash-orders", input);
  return response.data;
};

export const getWashOrders = async (
  isServer: boolean,
  params: { status?: string; date?: string; page?: number; limit?: number }
): Promise<WashOrdersResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/wash-orders", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/wash-orders", { params });
    return response.data;
  }
};

export const getWashOrderByID = async (
  isServer: boolean,
  orderId: number
): Promise<WashOrderDetailResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get(`/auth/wash-orders/${orderId}`);
    return response.data;
  } else {
    const response = await api.get(`/auth/wash-orders/${orderId}`);
    return response.data;
  }
};

export const updateWashOrderStatus = async (
  orderId: number,
  status: string
) => {
  const response = await api.put(`/auth/wash-orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

export const updateWashOrderTotalPrice = async (
  orderId: number,
  price: number,
  profit: number,
) => {
  const response = await api.put(`/auth/wash-orders/${orderId}/price`, {
    price,
    profit,
  })
  return response.data;
};
