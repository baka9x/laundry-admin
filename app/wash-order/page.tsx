import BottomNav from "@/components/layout/BottomNav";
import WashOrderDetail from "@/components/wash-order/WashOrderDetail";
import React from "react";


const dataWashOrder = [
    {
        orderId: 1,
        phoneNumber: "0123456789",
        status: "Đã giặt xong",
        note: "Giao hàng vào ngày mai",
        pickUpDate: "2023-10-01",
    },
    {
        orderId: 2,
        phoneNumber: "0987654321",
        status: "Đang giặt",
        note: "Giao hàng vào ngày hôm nay",
        pickUpDate: "2023-10-02"
    }
]



export default function WashOrderPage() {
  return (
    <section className="bg-[#1f1f1f] h-screen md:h-[calc(100vh-5rem)] overflow-hidden">
        <WashOrderDetail />

         <BottomNav />
    </section>
  );
};
