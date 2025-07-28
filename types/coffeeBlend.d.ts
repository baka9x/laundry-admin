import { Material } from "./material";
import { Product } from "./product";

export interface CoffeeBlend {
    id: number;
    name: string;
    unit: string;
    created_at: string;
    updated_at: string;
}

export interface CoffeeBlendBatchDetail {
    blend_batch_id: number;
    material_id: number;
    material: Material;
    weight_used: number;
    cost_per_unit: number;
    created_at: string;
    updated_at: string;
}

export interface CoffeeBlendBatch {
    id: number;
    blend_id: number;
    coffee_blend: CoffeeBlend
    details: CoffeeBlendBatchDetail[];
    total_weight: number;
    created_at: string;
    updated_at: string;
}

export interface CoffeeBlendInput {
    name: string;
    unit?: string;
}

export interface CoffeeBlendBatchInput {
    blend_name: string,
    total_weight: number,
    material_weights: { [key: number]: number };
}

export interface CoffeeBlendsResponse {
    data: CoffeeBlend[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}

export interface CoffeeBlendBatchesResponse {
    data: CoffeeBlendBatch[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}