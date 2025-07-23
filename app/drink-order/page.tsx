import DrinkPOS from "@/components/drink-order/DrinkPOS";
import BottomNav from "@/components/layout/BottomNav";
import { getProducts } from "@/services/product";

import React from "react";


export default async function DrinkOrderPage() {

  const [products] = await Promise.all([
    getProducts(true, { type: "drink", page: 1, limit: 100 }),
  ]);

  return (
    <section className="h-[calc(100vh-5rem)] overflow-auto px-4 py-6 mb-10 md:mb-0">
      <DrinkPOS products={products.data} />
      <BottomNav />
    </section>
  );
}
