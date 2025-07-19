export interface DrinkOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
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
}