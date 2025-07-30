export interface ReportsResponse {
    data: {
        current_total: number,
        current_material_batch_total?: number,
        current_total_profit?: number,
        date: "today" | "this_week" | "this_month" | "custom" | string,
        start_date?: string,
        end_date?: string,
        percentage_change: number,
        order_num: number,
        material_batch_num?: number,
    }
    status: string
}