import { DrinkOrderDetailResponse, DrinkOrderInput, DrinkOrdersResponse } from "@/types/drinkOrder";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createDrinkOrder = async (input: DrinkOrderInput) => {
  const response = await api.post("/auth/drink-orders", input);
  return response.data;
};

export const getDrinkOrders = async (
  isServer: boolean,
  params: { status?: string; date?: string; page?: number; limit?: number }
): Promise<DrinkOrdersResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/drink-orders", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/drink-orders", { params });
    return response.data;
  }
};

export const getDrinkOrderByID = async (
  isServer: boolean,
  orderId: number
): Promise<DrinkOrderDetailResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get(`/auth/drink-orders/${orderId}`);
    return response.data;
  } else {
    const response = await api.get(`/auth/drink-orders/${orderId}`);
    return response.data;
  }
};

export const updateDrinkOrderStatus = async (
  orderId: number,
  status: string
) => {
  const response = await api.put(`/auth/drink-orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

export const updateDrinkOrderTotalPrice = async (
  orderId: number,
  price: number,
) => {
  const response = await api.put(`/auth/drink-orders/${orderId}/price`, {
    price,
  })
  return response.data;
};
