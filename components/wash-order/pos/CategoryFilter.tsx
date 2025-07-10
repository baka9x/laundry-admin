// components/CategoryFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { getProducts } from "@/services/product";


interface Props {
  onFilter: (serviceId: number | null) => void;
}

export default function CategoryFilter({ onFilter }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

  useEffect(() => {
    getProducts(false, { page: 1, limit: 100 }).then((res) => {
      setProducts(res.data);
    });
  }, []);

  // Lấy ra unique service
  const services = Array.from(
    new Map(products.map((p) => [p.service_id, p.service])).values()
  ).filter(Boolean); // lọc null

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => {
          setActiveServiceId(null);
          onFilter(null);
        }}
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          activeServiceId === null
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        Tất cả
      </button>

      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => {
            setActiveServiceId(service.id);
            onFilter(service.id);
          }}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeServiceId === service.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {service.name}
        </button>
      ))}
    </div>
  );
}
