import { BlendInventoriesResponse, BlendInventory, InventoriesResponse, Inventory } from "@/types/inventory";
import { getServerToken, serverApi } from "./serverApi";
import { api } from "./api";


export const getInventories = async (
    isServer = false,
    params: { page?: number; limit?: number }
): Promise<InventoriesResponse> => {
    if (isServer) {
        await getServerToken();
        const response = await serverApi.get("/auth/inventory", { params });
        return response.data;
    } else {
        const response = await api.get("/auth/inventory", { params });
        return response.data;
    }
};

export const getInventoryByMaterialID = async (
    isServer = false,
    materialId: number,
): Promise<Inventory> => {
    if (isServer) {
        await getServerToken();
        const response = await serverApi.get(`/auth/inventory/${materialId}`);
        return response.data;
    } else {
        const response = await api.get(`/auth/inventory/${materialId}`);
        return response.data;
    }
};

export const getBlendInventories = async (
    isServer = false,
    params: { page?: number; limit?: number }
): Promise<BlendInventoriesResponse> => {
    if (isServer) {
        await getServerToken();
        const response = await serverApi.get("/auth/blend-inventory", { params });
        return response.data;
    } else {
        const response = await api.get("/auth/blend-inventory", { params });
        return response.data;
    }
};

export const getBlendInventoryByBlendID = async (
    isServer = false,
    blendId: number,
): Promise<BlendInventory> => {
    if (isServer) {
        await getServerToken();
        const response = await serverApi.get(`/auth/blend-inventory/${blendId}`);
        return response.data;
    } else {
        const response = await api.get(`/auth/blend-inventory/${blendId}`);
        return response.data;
    }
};