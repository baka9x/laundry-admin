export interface Notification {
  id: number;
  customer_id?: null | number;
  title: string;
  content: string;
  type: "system" | "order" | "promotion" | string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationInput {
  customer_id?: null | number;
  title: string;
  content: string;
  type: "system" | "order" | "promotion" | string;
}

export interface NotificationsResponse {
  data: Notification[];
  limit: number;
  page: number;
  total: number;
  total_pages: number;
}

export interface CountUnreadNotificationsResponse {
  data: {
    unread_count: number;
  };
  status: string;
}
