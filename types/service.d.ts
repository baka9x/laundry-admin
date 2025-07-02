export interface Service {
    id: number;
    name: string;
    description: string;
    created_at: string; 
    updated_at: string; 
    products: any | null;
}

export interface ServiceInput {
    name: string;
    description: string;
}

export interface ServicesResponse {
    data: Service[];
    limit: number;
    page: number;
    total: number;
    total_pages: number;
}