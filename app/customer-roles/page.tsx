
import CustomerRoleDetail from "@/components/customer-role/CustomerRoleDetail";
import BottomNav from "@/components/layout/BottomNav";

export default async function CustomerRolePage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <CustomerRoleDetail />
      <BottomNav />
    </section>
  );
}
