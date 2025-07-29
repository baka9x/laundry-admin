export interface DrinkOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  unit_price_cost: number;
  subtotal_cost: number;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    price: number;
    unit: string;
    service_id: number;
    created_at: string;
    updated_at: string;
  };
}

export interface DrinkOrderItemInput {
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  unit_price_cost: number;
  subtotal_cost: number;
}

export interface TopDrinkOrderItemsResponse {
  data: {
    product_id: number;
    product_name: string;
    total_qty: number,
    total_amount: number
  }[],
  limit: number,
  page: number,
  total: number,
  total_pages: number
}