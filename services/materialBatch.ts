
import { MaterialBatchesResponse, MaterialBatchInput } from "@/types/material";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createMaterialBatch = async (isServer: false, input: MaterialBatchInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/material-batches", input);
    return response.data;
  } else {
    const response = await api.post("/auth/material-batches", input);
    return response.data;
  }
};

export const getMaterialBatchs = async (
  isServer = false,
  params: {page?: number; limit?: number }
): Promise<MaterialBatchesResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/material-batches", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/material-batches", { params });
    return response.data;
  }
};
export const updateMaterialBatch = async (isServer: false, materialBatchId: number, input: MaterialBatchInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/material-batches/${materialBatchId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/material-batches/${materialBatchId}`, input);
    return response.data;
  }
};
export const deleteMaterialBatch = async (isServer: false, materialBatchId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/material-batches/${materialBatchId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/material-batches/${materialBatchId}`);
    return response.data;
  }
};  