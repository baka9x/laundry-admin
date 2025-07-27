import { ProductMaterialInput, ProductMaterialsResponse } from "@/types/material";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createProductMaterial = async (isServer: false, input: ProductMaterialInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/product-materials", input);
    return response.data;
  } else {
    const response = await api.post("/auth/product-materials", input);
    return response.data;
  }
};

export const getProductMaterials = async (
  isServer = false,
  params: {page?: number; limit?: number }
): Promise<ProductMaterialsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/product-materials", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/product-materials", { params });
    return response.data;
  }
};
export const updateProductMaterial = async (isServer: false, productMaterialId: number, input: ProductMaterialInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/product-materials/${productMaterialId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/product-materials/${productMaterialId}`, input);
    return response.data;
  }
};
export const deleteProductMaterial = async (isServer: false, productMaterialId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/product-materials/${productMaterialId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/product-materials/${productMaterialId}`);
    return response.data;
  }
};  