import BottomNav from "@/components/layout/BottomNav";
import Pagination from "@/components/ui/Pagination";
import WashOrderDetail from "@/components/wash-order/WashOrderDetail";
import { getOrders } from "@/services/order";
import { OrdersResponse } from "@/types/order";
import React from "react";

export default async function WashOrderPage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-15">
      <WashOrderDetail />
      <BottomNav />
    </section>
  );
}
