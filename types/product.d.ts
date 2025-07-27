import Service from "./service";

export interface Product {
  id: number;
  service_id: number;
  service: Service | null;
  name: string;
  price: number;
  unit: string;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  service_id: number;
  name: string;
  price: number;
  unit: string;
}

export interface SellProductInput {
  product_id: number;
  quantity: number;
}

export interface ProductsResponse {
  data: Product[];
  limit: number;
  page: number;
  total: number;
  total_page: number;
}
