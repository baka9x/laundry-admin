import { ReportsResponse } from "@/types/report";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const countRevenueAndCompareWashOrders = async (
  isServer:boolean,
  params: { date?: string, start_date?:string, end_date?:string }
): Promise<ReportsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/reports/revenue-wash-order", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/reports/revenue-wash-order", { params });
    return response.data;
  }
};

export const countRevenueAndCompareDrinkOrders = async (
  isServer:boolean,
  params: { date?: string, start_date?:string, end_date?:string }
): Promise<ReportsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/reports/revenue-drink-order", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/reports/revenue-drink-order", { params });
    return response.data;
  }
};

export const countExpensesAndCompare = async (
  isServer:boolean,
  params: { date?: string, start_date?:string, end_date?:string }
): Promise<ReportsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/reports/expense", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/reports/expense", { params });
    return response.data;
  }
};

export const countProfitAndCompare = async (
  isServer:boolean,
  params: { date?: string, start_date?:string, end_date?:string }
): Promise<ReportsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/reports/profit", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/reports/profit", { params });
    return response.data;
  }
};