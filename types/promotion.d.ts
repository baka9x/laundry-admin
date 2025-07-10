export interface Promotion {
  id: number;
  name: string;
  discount_type: "percentage" | "fixed" | string;
  discount_value: number;
  min_order_value: number;
  priority_level_required: number | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface PromotionInput {
  name: string;
  discount_type: "percentage" | "fixed" | string;
  discount_value: number;
  min_order_value: number;
  priority_level_required: number | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface PromotionsResponse {
  data: Promotion[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}
