export interface Order {
  id: number;
  customer_name: string;
  user_name: string;
  order_date: string; // ISO datetime string
  pickup_time: string; // ISO datetime string
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled' | string; // có thể mở rộng enum
  order_items: OrderItem[];
  promotion_id: number | null;
  promotions: any | null; // hoặc bạn định nghĩa rõ kiểu Promotions nếu cần
}