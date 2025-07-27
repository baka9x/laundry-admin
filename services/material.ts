import { MaterialInput, MaterialsResponse } from "@/types/material";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createMaterial = async (isServer: false, input: MaterialInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/materials", input);
    return response.data;
  } else {
    const response = await api.post("/auth/materials", input);
    return response.data;
  }
};

export const getMaterials = async (
  isServer = false,
  params: {page?: number; limit?: number }
): Promise<MaterialsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/materials", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/materials", { params });
    return response.data;
  }
};

export const updateMaterial = async (isServer: false, materialId: number, input: MaterialInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/materials/${materialId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/materials/${materialId}`, input);
    return response.data;
  }
};
export const deleteMaterial = async (isServer: false, materialId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/materials/${materialId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/materials/${materialId}`);
    return response.data;
  }
};  