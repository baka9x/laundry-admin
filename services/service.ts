import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";
import { ServiceInput, ServicesResponse } from "@/types/service";

export const createService = async (isServer: false, input: ServiceInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/services", input);
    return response.data;
  } else {
    const response = await api.post("/auth/services", input);
    return response.data;
  }
};

export const getServices = async (
  isServer = false,
  params: { page?: number; limit?: number }
): Promise<ServicesResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/services", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/services", { params });
    return response.data;
  }
};
export const updateService = async (isServer: false, serviceId: number, input: ServiceInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/services/${serviceId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/services/${serviceId}`, input);
    return response.data;
  }
};
export const deleteService = async (isServer: false, serviceId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/services/${serviceId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/services/${serviceId}`);
    return response.data;
  }
};  