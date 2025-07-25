export interface ReportsResponse {
    data: {
        current_total: number,
        date: "today" | "this_week" | "this_month" | "custom" | string,
        start_date?: string,
        end_date?: string,
        percentage_change: number,
        order_num: number,
    }
    status: string
}