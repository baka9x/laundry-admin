import { CustomerRole } from "./customerRole";

export interface Promotion {
  id: number;
  name: string;
  discount_type: "percentage" | "fixed" | string;
  discount_value: number;
  min_order_value: number;
  role_id: number | null;
  customer_role: CustomerRole;
  recent_orders_required: number | 0;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PromotionInput {
  name: string;
  discount_type: "percentage" | "fixed" | string;
  discount_value: number;
  min_order_value: number;
  role_id: number | 1;
  recent_orders_required: number | 0;
  start_date: Date | null;
  end_date: Date | null;
  is_active: boolean;
}

export interface PromotionsResponse {
  data: Promotion[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}
