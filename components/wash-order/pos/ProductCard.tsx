"use client";

import { Product } from "@/types/product";
import { BiPlus } from "react-icons/bi";


export default function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            {/* <p className="text-sm text-gray-500">{product.desc}</p> */}
          </div>
          {/* <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span> */}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-600">${product.price.toFixed(2)}</span>
          <button onClick={onAdd} className="bg-blue-100 text-blue-800 p-2 rounded-full hover:bg-blue-200 transition">
            <BiPlus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
