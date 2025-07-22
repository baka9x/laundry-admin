export interface Service {
    id: number;
    name: string;
    description: string;
    type: "wash" | "drink" | string;
    created_at: string;
    updated_at: string;
    products: null;
}

export interface ServiceInput {
    name: string;
    description: string;
    type: "wash" | "drink" | string;
}

export interface ServicesResponse {
    data: Service[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}