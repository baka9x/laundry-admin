export interface Order {
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
  order_items: OrderItem[];
  promotion_id: number | null;
  promotions: any | null; // hoặc bạn định nghĩa rõ kiểu Promotions nếu cần
}

export interface OrderInput {
  customer_id: number;
  user_id: number;
  order_date: Date;
  pickup_time?: Date | null;
  total_amount: number;
  promotion_id?: number | null;
}

export interface OrdersResponse {
  data: {
    id: number;
    customer_name: string;
    customer_phone: string;
    user_name: string;
    order_date: string; // ISO datetime string
    pickup_time?: string; // ISO datetime string or null
    total_amount: number;
    status:
      | "pending"
      | "progressing"
      | "completed"
      | "deliveried"
      | "cancelled"
      | string; // có thể mở rộng enum
    order_items: OrderItem[] | null; // có thể là null nếu không có mục nào
    promotion_id: number | null; // có thể là null nếu không có khuyến mãi
    promotions: any | null; // hoặc bạn định nghĩa rõ kiểu Promotions nếu cần
  }[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}
