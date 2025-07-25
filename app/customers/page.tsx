import CustomerDetail from "@/components/customer/CustomerDetail";
import BottomNav from "@/components/layout/BottomNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Quản Lý Khách Hàng',
  description: "Quản lý thông tin khách hàng",
  robots: "noindex"
}

export default async function CustomerPage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <CustomerDetail />
      <BottomNav />
    </section>
  );
}
