import {
  CustomerInput,
  CustomersResponse,
  NewCustomerResponse,
} from "@/types/customer";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";


export const createCustomer = async (
  isServer: boolean,
  input: CustomerInput
): Promise<NewCustomerResponse> => {
 if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/customers", input);
    return response.data;
  } else {
    const response = await api.post("/auth/customers", input);
    return response.data;
  }
};

export const getCustomers = async (
  isServer?: boolean,
  params?: { phone?: string; page?: number; limit?: number }
): Promise<CustomersResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/customers", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/customers", { params });
    return response.data;
  }
};

export const updateCustomer = async (
  isServer: boolean,
  customerId: number,
  input: CustomerInput
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/customers/${customerId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/customers/${customerId}`, input);
    return response.data;
  }
};

export const deleteCustomer = async (isServer: boolean, customerId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/customers/${customerId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/customers/${customerId}`);
    return response.data;
  }
};
