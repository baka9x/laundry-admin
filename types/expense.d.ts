export interface Expense {
    id: number,
    expense_type: string,
    amount: number,
    expense_date: string,
    description?: string | null,
    created_at: string,
    updated_at: string,

}

export interface ExpenseInput {
    expense_type: string,
    amount: number,
    expense_date: Date,
    description?: string
}

export interface ExpensesResponse {
    data: Expense[],
    limit:number,
    page: number,
    total: number,
    total_pages: number,
}