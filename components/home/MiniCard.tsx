import { formatVND } from "@/lib/formatVND";
import React from "react";

interface MiniCardProps {
  data: {
    title: string;
    icon: React.ReactNode;
    bgIcon?: string;
    number: number | 0;
    number_profit?: number | 0;
    orderNum: number | 0;
    orderUnit: string;
    footerNum: number | 0;
    compareText: string;
  };
}

const MiniCard: React.FC<MiniCardProps> = ({ data }) => {
  return (
    <div className="bg-[#1a1a1a] px-5 py-5 rounded-lg">
      <div className="flex items-start justify-between">
        <h3 className="text-[#f5f5f5] text-md font-semibold tracking-wide">{data.title}</h3>
        <button className={`${data.bgIcon} text-2xl text-[#f5f5f5] rounded-lg p-3`}>{data.icon}</button>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-[#f5f5f5] text-4xl font-bold">{formatVND(data.number)} {(data.number_profit ?? 0) ? ` | ${formatVND(data.number_profit ?? 0)}` : ""}</h3>
          <div className="text-gray-400 text-sm"><span className="text-red-500 font-bold text-xl">{data.orderNum}</span> {data.orderUnit}</div>
        </div>
        <h3 className="text-[#f5f5f5] text-lg mt-2"><span className={`${data.footerNum < 0 ? "text-red-800" : "text-green-500"} text-sm`}>{data.footerNum}%</span> so với {data.compareText}</h3>
      </div>
    </div>
  );
};
export default MiniCard;
