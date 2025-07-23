export interface WashOrder {
  id: number;
  customer_name: string;
  customer_phone: string;
  user_name: string;
  order_date: string; // ISO datetime string
  pickup_time: string; // ISO datetime string
  total_amount: number;
  status:
    | "pending"
    | "progressing"
    | "completed"
    | "deliveried"
    | "cancelled"
    | string; // có thể mở rộng enum
  wash_order_items: WashOrderItem[];
  promotion_id: number | null;
  promotions: any | null; // hoặc bạn định nghĩa rõ kiểu Promotions nếu cần
}

export interface WashOrderInput {
  customer_id: number;
  user_id: number;
  order_date: Date;
  pickup_time?: Date | null;
  total_amount: number;
  promotion_id?: number | null;
}

export interface WashOrdersResponse {
  data: WashOrder[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface WashOrderDetailResponse {
  id: number;
  order_date: string;
  pickup_time: string;
  status:
    | "pending"
    | "progressing"
    | "completed"
    | "deliveried"
    | "cancelled"
    | string;
  total_amount: number;
  customer: {
    id: number;
    name: string;
    phone: string;
    address: string;
    priority_level: number;
    total_orders: number;
  };
  user: {
    id: number;
    username: string;
    role: "admin" | "staff" | string;
    created_at: string;
    updated_at: string;
  };
  promotion: {
    id: number;
    name: string;
    discount_type: "percentage" | "fixed" | string;
    discount_value: number;
  }
  created_at: string;
  updated_at: string;
  wash_order_items: any;
}
