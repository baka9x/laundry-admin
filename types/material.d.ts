import { Product } from "./product";

export interface Material {
    id: number;
    name: string;
    unit: string;
    created_at: string;
    updated_at: string;
}

export interface MaterialBatch {
    id: number;
    material_id: number;
    material: Material
    quantity: number;
    import_price: number;
    unit_price: number;
    import_date: string;
    remaining_quantity: number;
    created_at: string;
    updated_at: string;
}

export interface ProductMaterial {
    id: number;
    product_id: number;
    product: Product
    batch_id: number | null;
    material_batch: MaterialBatch | null;
    blend_id: number | null;
    coffee_blend: CoffeeBlend | null;
    quantity_used: number;
    created_at: string;
    updated_at: string;
}

export interface MaterialInput {
    name: string;
    unit: string;
}

export interface MaterialBatchInput {
    material_id: number;
    quantity: number;
    import_price: number;
    import_date?: string;
    remaining_quantity: number;
}

export interface ProductMaterialInput {
    product_id?: number;
    batch_id?: number | null;
    blend_id?: number | null;
    quantity_used: number;
}

export interface MaterialsResponse {
    data: Material[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}

export interface MaterialBatchesResponse {
    data: MaterialBatch[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}

export interface ProductMaterialsResponse {
    data: ProductMaterial[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}