import { CoffeeBlend } from "./coffeeBlend";
import { Material } from "./material";

export interface Inventory {
    id: number;
    material_id: number;
    material: Material;
    total_quantity: number;
    average_cost_per_unit: number;
    created_at: string;
    updated_at: string;
}

export interface BlendInventory {
    blend_id: number;
    coffee_blend: CoffeeBlend;
    total_quantity: number;
    average_cost_per_unit: number;
    created_at: string;
    updated_at: string;
}

export interface InventoriesResponse {
    data: Inventory[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}

export interface BlendInventoriesResponse {
    data: BlendInventory[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}