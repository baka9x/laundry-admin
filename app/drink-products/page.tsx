import BottomNav from "@/components/layout/BottomNav";
import ProductDetail from "@/components/drink-product/ProductDetail";
import { Metadata } from "next";
//import { getUserProfile } from "@/services/user";
//import { User } from "@/types/user";

export const metadata: Metadata = {
  title: 'Quản Lý Sản Phẩm Đồ Uống',
  description: "Trang quản lý sản phẩm đồ uống",
  robots: "noindex"
}

export default async function ProductPage() {
  //let user: User = {} as User;
  // try {
  //   user = await getUserProfile(true);
  // } catch (error) {
  //   console.log("User not logged in or error:", error);
  // }
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden">
      <ProductDetail />
      <BottomNav />
    </section>
  );
}
