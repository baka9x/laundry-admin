import BottomNav from "@/components/layout/BottomNav";
import ServiceDetail from "@/components/service/ServiceDetail";

export default function ServicePage() {
  return (
    <section className="md:h-[calc(100vh-5rem)] overflow-hidden mb-20">
      <ServiceDetail />

      <BottomNav />
    </section>
  );
}
