import Greetings from "@/components/home/Greetings";
import PopularCustomers from "@/components/home/PopularCustomers";
import RecentTransactions from "@/components/home/RecentTransactions";
import BottomNav from "@/components/layout/BottomNav";
import { getCustomers } from "@/services/customer";
import { getWashOrders } from "@/services/washOrder";
import { getUserProfile } from "@/services/user";
import { CustomersResponse } from "@/types/customer";
import { WashOrdersResponse } from "@/types/washOrder";
import { User } from "@/types/user";
import { HomeRevenue } from "@/components/home/HomeRevenue";
import PopularDrinks from "@/components/home/PopularDrinks";

export default async function Home() {
  let user: User = {} as User;
  let ordersResponse: WashOrdersResponse;
  let customersResponse: CustomersResponse;
  try {
    user = await getUserProfile(true);
    ordersResponse = await getWashOrders(true, {
      status: "",
      date: "",
      page: 1,
      limit: 15
    })

    customersResponse = await getCustomers(true);
    return (
      // h-[calc(100vh-5rem)]
      <section className="flex flex-col md:flex-row gap-4 px-4 py-6 mb-20">
        {/* Main Content (left) */}
        <div className="w-full md:w-2/3">
          <div className="bg-[#1f1f1f] p-4 rounded-lg shadow">
            <Greetings data={user} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <HomeRevenue />
            </div>
            <RecentTransactions data={ordersResponse} />

          </div>
        </div>

        {/* Sidebar (right) */}
        <div className="w-full md:w-1/3">
          <div className="bg-[#1f1f1f] p-4 rounded-lg shadow">
            <PopularCustomers data={customersResponse} />
             <PopularDrinks data={customersResponse} />
          </div>

    
          
        </div>

        

        <BottomNav />
      </section>

    );
  } catch (error) {
    console.log("User not logged in or error:", error);
  }


}
