import { ExpenseInput, ExpensesResponse } from "@/types/expense";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";


export const createExpense = async (isServer: boolean, input: ExpenseInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/expenses", input);
    return response.data;
  } else {
    const response = await api.post("/auth/expenses", input);
    return response.data;
  }
};

export const getExpenses = async (
  isServer = false,
  params: { page?: number; limit?: number }
): Promise<ExpensesResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/expenses", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/expenses", { params });
    return response.data;
  }
};
export const updateExpense = async (isServer: boolean, expenseId: number, input: ExpenseInput) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(`/auth/expenses/${expenseId}`, input);
    return response.data;
  } else {
    const response = await api.put(`/auth/expenses/${expenseId}`, input);
    return response.data;
  }
};
export const deleteExpense = async (isServer: boolean, expenseId: number) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(`/auth/expenses/${expenseId}`);
    return response.data;
  } else {
    const response = await api.delete(`/auth/expenses/${expenseId}`);
    return response.data;
  }
};  