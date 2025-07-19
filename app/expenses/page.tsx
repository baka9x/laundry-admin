import ExpenseDetail from "@/components/expense/ExpenseDetail";
import BottomNav from "@/components/layout/BottomNav";

export default function ExpensePage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <ExpenseDetail />

      <BottomNav />
    </section>
  );
}
