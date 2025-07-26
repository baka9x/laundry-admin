import DrinkOrderDetail from "@/components/drink-order/DrinkOrderDetail";
import BottomNav from "@/components/layout/BottomNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Quản Lý Đơn Đồ Uống',
  description: "Trang quản lý thông tin đồ uống",
  robots: "noindex",
}

export default async function WashOrderPage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-15">
      <DrinkOrderDetail />
      <BottomNav />
    </section>
  );
}
