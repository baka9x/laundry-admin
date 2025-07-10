import BottomNav from "@/components/layout/BottomNav";
import PromotionDetail from "@/components/promotion/PromotionDetail";


export default async function PromotionPage() {
  //let user: User = {} as User;
  // try {
  //   user = await getUserProfile(true);
  // } catch (error) {
  //   console.log("User not logged in or error:", error);
  // }
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <PromotionDetail />
      <BottomNav />
    </section>
  );
}
