"use client";
import BottomNav from "@/components/layout/BottomNav";
import ServiceDetail from "@/components/service/ServiceDetail";
import Link from "next/link";

const features = [
  {
    title: "Dịch vụ",
    description: "Quản lý dịch vụ giặt ủi và đồ uống",
    href: "/services",
  },
  { title: "Sản phẩm", description: "Quản lý sản phẩm", href: "/products" },
  {
    title: "Khuyến mại",
    description: "Quản lý chương trình khuyến mại",
    href: "/promotions",
  },
  {
    title: "Chi phí",
    description: "Theo dõi và quản lý chi phí",
    href: "/costs",
  },
  {
    title: "Khách hàng",
    description: "Quản lý thông tin khách hàng",
    href: "/customers",
  },
];

export default function ServicesPage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <ServiceDetail />

      <BottomNav />
    </section>
  );
}
