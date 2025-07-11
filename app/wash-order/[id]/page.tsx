import BottomNav from "@/components/layout/BottomNav";
import POSLayout from "@/components/wash-order/pos/POSLayout";
import WashPOS from "@/components/wash-order/pos/WashPOS";
import { getProducts } from "@/services/product";
import { getWashOrderByID } from "@/services/washOrder";

import React from "react";
interface WashOrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function WashOrderPage({ params }: WashOrderPageProps) {
  const { id } = await params;
  const orderId = Number(id);

  const [order, products] = await Promise.all([
    getWashOrderByID(true, orderId),
    getProducts(true, { page: 1, limit: 100 }),
  ]);

  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-15">
      
      <WashPOS order={order} products={products.data} />
      <BottomNav />
    </section>
  );
}
