import BottomNav from "@/components/layout/BottomNav";
import ProductDetail from "@/components/wash-product/ProductDetail";
import { Metadata } from "next";
//import { getUserProfile } from "@/services/user";
//import { User } from "@/types/user";

export const metadata: Metadata = {
  title: 'Quản Lý Sản Phẩm Giặt Ủi',
  description: "Trang thông tin các sản phẩm dịch vụ giặt ủi sấy.",
  robots: "noindex",
}

export default async function ProductPage() {
  //let user: User = {} as User;
  // try {
  //   user = await getUserProfile(true);
  // } catch (error) {
  //   console.log("User not logged in or error:", error);
  // }
  return (
    //h-full md:h-[calc(100vh-5rem)]
    <section className="overflow-hidden mb-20">
      <ProductDetail />
      <BottomNav />
    </section>
  );
}
