export interface CustomerRole {
    id: number;
    name: string;
    description: string;
    min_required: number;
    max_required: number;
    created_at: string;
    updated_at: string;
}
export interface CustomerRoleInput {
    name: string;
    description: string;
    min_required: number;
    max_required: number;
}
export interface CustomerRolesResponse {
    data: CustomerRole[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}
export interface NewCustomerRoleResponse {
    role_id: number;
    role_name: string;
    role_description: string;
    min_required: number;
    max_required: number;
    created_at: string;
    updated_at: string;
    message: string;
    status: string;
    error?: string;
}