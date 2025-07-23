import { CustomerRoleInput, CustomerRolesResponse, NewCustomerRoleResponse } from "@/types/customerRole";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";


export const createCustomerRole = async (
  isServer: boolean,
  input: CustomerRoleInput
): Promise<NewCustomerRoleResponse> => {
 if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/customer-roles", input);
    return response.data;
  } else {
    const response = await api.post("/auth/customer-roles", input);
    return response.data;
  }
};

export const getCustomerRoles = async (
  isServer?: boolean,
  params?: { page?: number; limit?: number }
): Promise<CustomerRolesResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/customer-roles", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/customer-roles", { params });
    return response.data;
  }
};

export const updateCustomerRole = async (
  isServer: boolean,
  customerRoleId: number,
  input: CustomerRoleInput
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/customer-roles/${customerRoleId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/customer-roles/${customerRoleId}`, input);
    return response.data;
  }
};

export const deleteCustomerRole = async (isServer: boolean, customerRoleId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/customer-roles/${customerRoleId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/customer-roles/${customerRoleId}`);
    return response.data;
  }
};
