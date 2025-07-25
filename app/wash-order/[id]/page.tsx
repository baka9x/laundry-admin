import BottomNav from "@/components/layout/BottomNav";
import WashPOS from "@/components/wash-order/pos/WashPOS";
import { getProducts } from "@/services/product";
import { getWashOrderByID } from "@/services/washOrder";
import { Metadata } from "next";

import React from "react";
interface WashOrderPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Tính Tiền Đơn Giặt',
  description: "Trang POS đơn giặt.",
  robots: "noindex",
}

export default async function WashOrderPage({ params }: WashOrderPageProps) {
  const { id } = await params;
  const orderId = Number(id);

  const [order, products] = await Promise.all([
    getWashOrderByID(true, orderId),
    getProducts(true, { type: "wash", page: 1, limit: 100 }),
  ]);

  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-auto overflow-x-scroll px-4 py-6">
      <WashPOS order={order} products={products.data} />
      <BottomNav />
    </section>
  );
}
