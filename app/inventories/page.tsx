import InventoryDetail from "@/components/inventory/InventoryDetail";
import BottomNav from "@/components/layout/BottomNav";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Quản Lý Tồn Kho',
    description: "Trang quản lý tồn kho.",
    robots: "noindex",
}

export default function MaterialPage() {
    return (

       <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
             <InventoryDetail />
       
             <BottomNav />
           </section>

    );
}
