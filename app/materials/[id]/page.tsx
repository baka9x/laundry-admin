import BottomNav from "@/components/layout/BottomNav";
import MaterialBatchDetail from "@/components/material/batch/MaterialBatchDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Quản Lý Nhập Lô Nguyên Liệu',
  description: "Trang quản lý nhập nguyên liệu theo đợt, theo lô.",
  robots: "noindex",
}

interface MaterialBatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function MaterialBatchPage({ params }: MaterialBatchPageProps) {
  const { id } = await params;
  const materialId = Number(id);

  
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <MaterialBatchDetail />

      <BottomNav />
    </section>
  );
}
