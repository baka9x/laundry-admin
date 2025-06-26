import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";

type TransactionProps = {
  index: number;
  orderId: string;
  phoneNumber: string;
  status: string;
  note: string;
};

const TransactionList: React.FC<TransactionProps> = ({
  index,
  orderId,
  phoneNumber,
  status,
  note,
}) => {
  return (
    <div className="flex items-center gap-5 mb-3">
      <button className="bg-[#f6b100] text-[#f5f5f5] p-3 text-xl font-bold rounded-lg">
        #{index}
      </button>
      <div className="flex items-center justify-between w-[100%]">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Đơn hàng #{orderId}
          </h3>
          <p className="text-[#ababab] text-sm">Khách hàng: {phoneNumber}</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-green-600 px-4">
            <FaCheckDouble className="inline mr-2" /> {status}
          </p>
          <p className="text-[#ababab] text-sm flex items-center">
            <FaCircle className="inline mr-2 text-green-600" />
            {note}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
