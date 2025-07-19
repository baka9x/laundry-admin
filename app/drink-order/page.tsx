import BottomNav from "@/components/layout/BottomNav";
import WashPOS from "@/components/wash-order/pos/WashPOS";
import { getProducts } from "@/services/product";
import { getWashOrderByID } from "@/services/washOrder";

import React from "react";


export default async function DrinkOrderPage() {
 
  const [order, products] = await Promise.all([
    getWashOrderByID(true, orderId),
    getProducts(true, { page: 1, limit: 100 }),
  ]);

  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-auto overflow-x-scroll px-4 py-6">
      <WashPOS order={order} products={products.data} />
      <BottomNav />
    </section>
  );
}
