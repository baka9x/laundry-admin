import ExpenseDetail from "@/components/expense/ExpenseDetail";
import BottomNav from "@/components/layout/BottomNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Quản Lý Chi Phí',
  description: "Trang ghi chép chi phí của tiệm",
  robots: "noindex"
}

export default function ExpensePage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <ExpenseDetail />

      <BottomNav />
    </section>
  );
}
