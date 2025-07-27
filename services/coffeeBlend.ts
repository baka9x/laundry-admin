import { CoffeeBlendInput, CoffeeBlendsResponse } from "@/types/coffeeBlend";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createCoffeeBlend = async (isServer: false, input: CoffeeBlendInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/coffee-blends", input);
    return response.data;
  } else {
    const response = await api.post("/auth/coffee-blends", input);
    return response.data;
  }
};

export const getCoffeeBlends = async (
  isServer = false,
  params: {page?: number; limit?: number }
): Promise<CoffeeBlendsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/coffee-blends", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/coffee-blends", { params });
    return response.data;
  }
};
export const updateCoffeeBlend = async (isServer: false, coffeeBlendId: number, input: CoffeeBlendInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/coffee-blends/${coffeeBlendId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/coffee-blends/${coffeeBlendId}`, input);
    return response.data;
  }
};
export const deleteCoffeeBlend = async (isServer: false, coffeeBlendId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/coffee-blends/${coffeeBlendId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/coffee-blends/${coffeeBlendId}`);
    return response.data;
  }
};  