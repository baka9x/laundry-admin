import { ProductInput, ProductsResponse } from "@/types/product";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createProduct = async (isServer: false, input: ProductInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/products", input);
    return response.data;
  } else {
    const response = await api.post("/auth/products", input);
    return response.data;
  }
};

export const getProducts = async (
  isServer: boolean,
  params: { type?: string, service_id?: number, page?: number; limit?: number }
): Promise<ProductsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/products", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/products", { params });
    return response.data;
  }
};

export const updateProduct = async (
  isServer: boolean,
  productId: number,
  input: ProductInput
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/products/${productId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/products/${productId}`, input);
    return response.data;
  }
};

export const deleteProduct = async (isServer: boolean, productId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/products/${productId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/products/${productId}`);
    return response.data;
  }
};
