import BottomNav from "@/components/layout/BottomNav";
import MaterialDetail from "@/components/material/MaterialDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Quản Lý Nguyên Liệu',
  description: "Trang quản lý định nghĩa các nguyên liệu.",
  robots: "noindex",
}

export default function MaterialPage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <MaterialDetail />

      <BottomNav />
    </section>
  );
}
