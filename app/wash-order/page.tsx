import BottomNav from "@/components/layout/BottomNav";
import WashOrderDetail from "@/components/wash-order/WashOrderDetail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Quản Lý Đơn Giặt',
  description: "Trang quản lý thông tin đơn giặt",
  robots: "noindex",
}

export default async function WashOrderPage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-15">
      <WashOrderDetail />
      <BottomNav />
    </section>
  );
}
