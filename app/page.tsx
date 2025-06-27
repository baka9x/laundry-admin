import Greetings from "@/components/home/Greetings";
import MiniCard from "@/components/home/MiniCard";
import PopularCustomers from "@/components/home/PopularCustomers";
import RecentTransactions from "@/components/home/RecentTransactions";
import BottomNav from "@/components/layout/BottomNav";
import { getUserProfile } from "@/services/user";
import { User } from "@/types/user";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

const dataTotalEarnings = {
  title: "Thu nhập hôm nay",
  value: "1.000.000đ",
  icon: <BsCashCoin size={30} />,
  bgIcon: "bg-[#02ca3a]",
  number: 1000000,
  footerNum: 10,
};

const dataInProgress = {
  title: "Đang xử lý",
  value: "1.000.000đ",
  icon: <GrInProgress size={30} />,
  bgIcon: "bg-[#f68100]",
  number: 1000000,
  footerNum: 10,
};

const dataPopularCustomers = [
  {
    index: 1,
    name: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    totalWashes: 5,
    totalSpent: 5000000,
    lastWashDate: "2023-10-01",
  },
  {
    index: 2,
    name: "Nguyễn Văn B",
    phoneNumber: "0123456789",
    totalWashes: 5,
    totalSpent: 5000000,
    lastWashDate: "2023-10-01",
  },
  {
    index: 3,
    name: "Nguyễn Văn C",
    phoneNumber: "0123456789",
    totalWashes: 5,
    totalSpent: 5000000,
    lastWashDate: "2023-10-01",
  },
  {
    index: 4,
    name: "Nguyễn Văn D",
    phoneNumber: "0123456789",
    totalWashes: 5,
    totalSpent: 5000000,
    lastWashDate: "2023-10-01",
  },
  {
    index: 5,
    name: "Nguyễn Văn E",
    phoneNumber: "0123456789",
    totalWashes: 5,
    totalSpent: 5000000,
    lastWashDate: "2023-10-01",
  },
];

const dataTransactions = [
  {
    index: 1,
    orderId: "12345",
    phoneNumber: "0900999999",
    status: "Đã hoàn thành",
    note: "Sẵn sàng để giao",
  },
  {
    index: 2,
    orderId: "67890",
    phoneNumber: "0900888888",
    status: "Đang xử lý",
    note: "Chờ thanh toán",
  },
  {
    index: 3,
    orderId: "54321",
    phoneNumber: "0900777777",
    status: "Đã hủy",
    note: "Khách từ chối nhận",
  },
  {
    index: 4,
    orderId: "54321",
    phoneNumber: "0900777777",
    status: "Đã hủy",
    note: "Khách từ chối nhận",
  },
  {
    index: 5,
    orderId: "54321",
    phoneNumber: "0900777777",
    status: "Đã hủy",
    note: "Khách từ chối nhận",
  },
  {
    index: 6,
    orderId: "54321",
    phoneNumber: "0900777777",
    status: "Đã hủy",
    note: "Khách từ chối nhận",
  },
];

export default async function Home() {
  let user: User = {} as User;
  try {
    user = await getUserProfile(true);
  } catch (error) {
    console.log("User not logged in or error:", error);
  }

  return (
    // h-[calc(100vh-5rem)]
    <section className="flex flex-col md:flex-row gap-4 px-4 py-6 mb-20">
      {/* Main Content (left) */}
      <div className="w-full md:w-2/3">
        <div className="bg-[#1f1f1f] p-4 rounded-lg shadow">
          <Greetings data={user} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <MiniCard data={dataTotalEarnings} />
            <MiniCard data={dataInProgress} />
          </div>

          <RecentTransactions data={dataTransactions}/>
        </div>
      </div>

      {/* Sidebar (right) */}
      <div className="w-full md:w-1/3">
        <div className="bg-[#1f1f1f] p-4 rounded-lg shadow">
           <PopularCustomers data={dataPopularCustomers} />
        </div>
      </div>

     <BottomNav />
    </section>

   
    // <section className="bg-[#1f1f1f] h-full md:h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
    //   {/* Left div */}
    //   <div className="flex flex-col gap-6 flex-1">
    //     <Greetings data={user} />
    //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4">
    //       <MiniCard data={dataTotalEarnings} />
    //       <MiniCard data={dataInProgress} />
    //     </div>
    //    <RecentTransactions data={dataTransactions}/>

    //   </div>
    //   {/* Right div */}
    //   <div className="w-full md:w-[35%]">
    //     <PopularCustomers data={dataPopularCustomers} />
    //   </div>
    // </section>
  );
}
