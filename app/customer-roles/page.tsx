
import CustomerRoleDetail from "@/components/customer-role/CustomerRoleDetail";
import BottomNav from "@/components/layout/BottomNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Danh Hiệu Khách Hàng',
  description: "Quản lý danh hiệu khách hàng",
  robots: "noindex"
}

export default async function CustomerRolePage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <CustomerRoleDetail />
      <BottomNav />
    </section>
  );
}
