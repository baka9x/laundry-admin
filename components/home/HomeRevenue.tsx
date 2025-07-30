"use client";
import React, { useEffect, useState } from "react";
import { IoMdCafe } from "react-icons/io";
import { TbWashHand } from "react-icons/tb";
import MiniCard from "./MiniCard";
import { countExpensesAndCompare, countProfitAndCompare, countRevenueAndCompareDrinkOrders, countRevenueAndCompareWashOrders } from "@/services/report";
import { ImStatsDots } from "react-icons/im";
import { FaMoneyBillWave } from "react-icons/fa";


export function HomeRevenue() {

    const [revenueWashOrders, setRevenueWashOrders] = useState<any>({
        title: "DOANH THU ĐƠN GIẶT HÔM NAY",
        icon: <TbWashHand size={30} />,
        bgIcon: "bg-blue-600",
        number: 0,
        numberProfit: 0,
        orderNum: 0,
        orderUnit: "Đơn",
        footerNum: 0,
        compareText: " hôm qua"
    });

    const [revenueDrinkOrders, setRevenueDrinkOrders] = useState<any>({
        title: "DOANH THU ĐỒ UỐNG HÔM NAY",
        icon: <IoMdCafe size={30} />,
        bgIcon: "bg-yellow-800",
        number: 0,
        numberProfit: 0,
        orderNum: 0,
        orderUnit: "Đơn",
        footerNum: 0,
        compareText: " hôm qua"
    });

    const [thisMonthExpense, setThisMonthExpense] = useState<any>({
        title: "CHI PHÍ THÁNG NÀY",
        icon: <ImStatsDots size={30} />,
        bgIcon: "bg-red-800",
        number: 0,
        materialBatchTotal: 0,
        orderNum: 0,
        materialBatchNum: 0,
        orderUnit: "Đơn",
        materialBatchUnit: "Lô",
        footerNum: 0,
        compareText: "tháng trước"
    });

    const [thisMonthProfit, setThisMonthProfit] = useState<any>({
        title: "LỢI NHUẬN THÁNG NÀY",
        icon: <FaMoneyBillWave size={30} />,
        bgIcon: "bg-green-600",
        number: 0,
        orderNum: 0,
        orderUnit: "Đơn",
        footerNum: 0,
        compareText: "tháng trước"
    });

    const fetchRevenueWashOrders = async () => {
        try {
            const res = await countRevenueAndCompareWashOrders(false, {date: "today"})
            if (!res) {
                return;
            }
            setRevenueWashOrders({
                ...revenueWashOrders,
                number: res.data.current_total,
                numberProfit: res.data.current_total_profit,
                orderNum: res.data.order_num,
                footerNum: res.data.percentage_change
            })

        } catch (error) {
            console.log("Error fetching revenue wash orders: ", error);
        }
    }

    const fetchRevenueDrinkOrders = async () => {
        try {
            const res = await countRevenueAndCompareDrinkOrders(false, {date: "today"})
            if (!res) {
                return;
            }
            setRevenueDrinkOrders({
                ...revenueDrinkOrders,
                number: res.data.current_total,
                numberProfit: res.data.current_total_profit,
                orderNum: res.data.order_num,
                footerNum: res.data.percentage_change
            })

        } catch (error) {
            console.log("Error fetching revenue wash orders: ", error);
        }
    }

    const fetchExpenses = async () => {
        try {
            const res = await countExpensesAndCompare(false, {date: "this_month"})
            if (!res) {
                return;
            }
            setThisMonthExpense({
                ...thisMonthExpense,
                number: res.data.current_total,
                materialBatchTotal: res.data.current_material_batch_total,
                orderNum: res.data.order_num,
                materialBatchNum: res.data.material_batch_num,
                footerNum: res.data.percentage_change
            })
        } catch (error) {
            console.log("Error fetching expenses: ", error);
        }
    }

    const fetchProfit = async () => {
        try {
            const res = await countProfitAndCompare(false, {date: "this_month"})
            if (!res) {
                return;
            }
            setThisMonthProfit({
                ...thisMonthProfit,
                number: res.data.current_total,
                orderNum: res.data.order_num,
                footerNum: res.data.percentage_change
            })
        } catch (error) {
            console.log("Error fetching profits: ", error);
        }
    }

    useEffect(() => {
        fetchRevenueWashOrders();
        fetchRevenueDrinkOrders();
        fetchExpenses();
        fetchProfit();
    }, [])

    return (
        <>
            <MiniCard data={revenueWashOrders} />
            <MiniCard data={revenueDrinkOrders} />
            <MiniCard data={thisMonthExpense} />
            <MiniCard data={thisMonthProfit} />
        </>
    );
};

