import Greetings from "@/components/home/Greetings";
import MiniCard from "@/components/home/MiniCard";
import RecentTransactions from "@/components/home/RecentTransactions";
import BottomNav from "@/components/layout/BottomNav";
import { getUserProfile } from "@/services/user";
import { User } from "@/types/user";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

export default async function Home() {
  let user: User = {} as User;
  try {
    user = await getUserProfile(true);
  } catch (error) {
    console.log("User not logged in or error:", error);
  }

  const dataTotalEarnings = {
    title: "Thu nhập hôm nay",
    value: "1.000.000đ",
    icon: <BsCashCoin size={30} />,
    bgIcon : "bg-[#02ca3a]",
    number: 1000000,
    footerNum: 10,
  };

  const dataInProgress = {
    title: "Đang xử lý",
    value: "1.000.000đ",
    icon: <GrInProgress size={30} />,
    bgIcon : "bg-[#f68100]",
    number: 1000000,
    footerNum: 10,
  };

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
      {/* Left div */}
      <div className="flex-[3]">
        <Greetings data={user} />
        <div className="flex items-center w-full gap-3 px-8 mt-8">
          <MiniCard data={dataTotalEarnings} />
          <MiniCard data={dataInProgress} />
        </div>
        <RecentTransactions />
      </div>
      {/* Right div */}
      <div className="flex-[2] bg-[#1a1a1a]">
        <BottomNav />
      </div>
    </section>
  );
}
