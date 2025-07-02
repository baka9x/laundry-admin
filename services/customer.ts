import {
  CustomerInput,
  CustomersResponse,
  NewCustomerResponse,
} from "@/types/customer";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createCustomer = async (
  input: CustomerInput
): Promise<NewCustomerResponse> => {
  const response = await api.post("/auth/customers", input);
  return response.data;
};

export const getCustomers = async (
  isServer?: boolean,
  phone?: string
): Promise<CustomersResponse> => {
  const params: { phone?: string } = {};
  if (phone) {
    params.phone = phone;
  }
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/customers", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/customers", { params });
    return response.data;
  }
};
