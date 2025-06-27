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
