import { CoffeeBlendBatchesResponse, CoffeeBlendBatchInput } from "@/types/coffeeBlend";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createCoffeeBlendBatch = async (isServer: false, input: CoffeeBlendBatchInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/coffee-blend-batches", input);
    return response.data;
  } else {
    const response = await api.post("/auth/coffee-blend-batches", input);
    return response.data;
  }
};

export const getCoffeeBlendBatches = async (
  isServer = false,
  params: {page?: number; limit?: number }
): Promise<CoffeeBlendBatchesResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/coffee-blend-batches", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/coffee-blend-batches", { params });
    return response.data;
  }
};
export const updateCoffeeBlendBatch = async (isServer: false, coffeeBlendBatchId: number, input: CoffeeBlendBatchInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/coffee-blend-batches/${coffeeBlendBatchId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/coffee-blend-batches/${coffeeBlendBatchId}`, input);
    return response.data;
  }
};
export const deleteCoffeeBlendBatch = async (isServer: false, coffeeBlendBatchId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/coffee-blend-batches/${coffeeBlendBatchId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/coffee-blend-batches/${coffeeBlendBatchId}`);
    return response.data;
  }
};  