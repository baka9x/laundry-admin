import { PromotionInput, PromotionsResponse } from "@/types/promotion";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createPromotion = async (
  isServer: boolean,
  input: PromotionInput
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/promotions", input);
    return response.data;
  } else {
    const response = await api.post("/auth/promotions", input);
    return response.data;
  }
};

export const getPromotions = async (
  isServer = false,
  params: { page?: number; limit?: number }
): Promise<PromotionsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/promotions", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/promotions", { params });
    return response.data;
  }
};

export const updatePromotion = async (
  isServer: boolean,
  promotionId: number,
  input: PromotionInput
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/promotions/${promotionId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/promotions/${promotionId}`, input);
    return response.data;
  }
};

export const deletePromotion = async (isServer: boolean, promotionId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/promotions/${promotionId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/promotions/${promotionId}`);
    return response.data;
  }
};
