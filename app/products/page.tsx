import BottomNav from "@/components/layout/BottomNav";
import ProductDetail from "@/components/product/ProductDetail";
//import { getUserProfile } from "@/services/user";
//import { User } from "@/types/user";

export default async function ProductPage() {
  //let user: User = {} as User;
  // try {
  //   user = await getUserProfile(true);
  // } catch (error) {
  //   console.log("User not logged in or error:", error);
  // }
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <ProductDetail />
      <BottomNav />
    </section>
  );
}
