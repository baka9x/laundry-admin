import BottomNav from "@/components/layout/BottomNav";
import ServiceDetail from "@/components/service/ServiceDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Quản Lý Dịch Vụ',
  description: "Trang quản lý các dịch vụ đang hoạt động.",
  robots: "noindex",
}

export default function ServicePage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <ServiceDetail />

      <BottomNav />
    </section>
  );
}
