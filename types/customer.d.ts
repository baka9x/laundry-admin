import { CustomerRole } from "./customerRole";

export interface Customer {
    id: number;
    name: string;
    phone: string;
    address: string;
    role_id: number;
    customer_role: CustomerRole;
    total_washes: number;
    last_wash_date: string;
    total_spent: number;
    note: string;
    wash_cycle: number;
    created_at: string;
    updated_at: string;
}

export interface CustomerInput {
    name: string;
    phone: string;
    address: string;
    role_id?: number;
    note?: string;
    total_washes?: number;
    total_spent?: number;
    wash_cycle?: number; // Số lần giặt
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
    total_washes: number;
    note: string | null;
    created_at: string;
    updated_at: string;
    error?: string;
}