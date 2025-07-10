import BottomNav from "@/components/layout/BottomNav";
import WashOrderDetail from "@/components/wash-order/WashOrderDetail";
import React from "react";

export default async function WashOrderPage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-15">
      <WashOrderDetail />
      <BottomNav />
    </section>
  );
}
