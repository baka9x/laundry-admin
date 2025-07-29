import { DrinkOrderItem } from "./drinkOrderItem";
import { Promotion } from "./promotion";

export interface DrinkOrder {
  id: number;
  customer_name: string;
  customer_phone: string;
  user_name: string;
  order_date: string; // ISO datetime string
  total_amount: number;
  total_profit: number;
  status:
  | "pending"
  | "progressing"
  | "completed"
  | "deliveried"
  | "cancelled"
  | string; // có thể mở rộng enum
  wash_order_items: DrinkOrderItem[];
  promotion_id: number | null;
  promotions: Promotion; // hoặc bạn định nghĩa rõ kiểu Promotions nếu cần
}

export interface DrinkOrderInput {
  customer_id?: number | null;
  user_id: number;
  order_date: Date;
  total_amount: number;
  total_profit: number;
  promotion_id?: number | null;
  status?: "pending" | "progressing" | "completed" | "deliveried" | "cancelled" | string;
}

export interface DrinkOrdersResponse {
  data: DrinkOrder[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface DrinkOrderDetailResponse {
  id: number;
  order_date: string;
  status:
  | "pending"
  | "progressing"
  | "completed"
  | "deliveried"
  | "cancelled"
  | string;
  total_amount: number;
  total_profit: number;
  customer: Customer;
  user: User;
  promotion: Promotion | null;
  created_at: string;
  updated_at: string;
  drink_order_items: DrinkOrderItem[];
}

export interface NewDrinkOrderResponse {
  order_id: number;
  status: string;
  message: string;
  error?: string;
}