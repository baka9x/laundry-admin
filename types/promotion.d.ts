export interface Promotion {
    id: number;
    name: string;
    discount_type: string; // 'percentage' | 'fixed'
    discount_value: number;
    min_order_value: number;
    priority_level_required: number | null;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}