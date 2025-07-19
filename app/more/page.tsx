'use client';
import BottomNav from "@/components/layout/BottomNav";
import Link from "next/link";

const features = [
  { title: "Dịch vụ", description: "Quản lý dịch vụ giặt ủi và đồ uống", href: "/services" },
  { title: "Sản phẩm", description: "Quản lý sản phẩm", href: "/products" },
  { title: "Khuyến mại", description: "Quản lý chương trình khuyến mại", href: "/promotions" },
  { title: "Chi phí", description: "Theo dõi và quản lý chi phí", href: "/expenses" },
  { title: "Khách hàng", description: "Quản lý thông tin khách hàng", href: "/customers" },
];

export default function MorePage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Quản lý thêm
        </h1>
      </div>

      <div className="px-6 md:px-10 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Link
              href={feature.href}
              key={feature.title}
              className="bg-[#1f1f1f] p-4 rounded-lg shadow-md 
              hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1 
              transition-all duration-300 ease-in-out cursor-pointer"
            >
              <h2 className="text-[#f5f5f5] text-lg font-semibold mb-2">
                {feature.title}
              </h2>
              <p className="text-[#ababab] text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </section>
  );
}
