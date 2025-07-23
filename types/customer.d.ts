import { CustomerRole } from "./customerRole";

export interface Customer {
    id: number;
    name: string;
    phone: string;
    address: string;
    role_id: number;
    customer_role: CustomerRole;
    total_orders: number;
    last_wash_date: string;
    total_spent: number;
    note: string;
    recent_orders: number;
    created_at: string;
    updated_at: string;
}

export interface CustomerInput {
    name: string;
    phone: string;
    address: string;
    role_id?: number;
    note?: string;
    total_orders?: number;
    total_spent?: number;
    recent_orders?: number; // Số lần giặt
}


export interface CustomersResponse {
    data: Customer[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}

export interface NewCustomerResponse {
    customer_id: number;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    message: string;
    status: string;
    priority_level: number;
    total_orders: number;
    note: string | null;
    created_at: string;
    updated_at: string;
    error?: string;
}