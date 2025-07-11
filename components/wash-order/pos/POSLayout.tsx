"use client";

import { useState } from "react";
import { IoPerson, IoPricetag, IoTrash, IoCheckmarkCircle, IoAdd } from "react-icons/io5";

export default function POSLayout() {
  return (
    <div className="bg-[#1f1f1f] rounded-xl shadow-lg overflow-hidden text-[#f5f5f5]">
      <div className="flex flex-col md:flex-row">
        {/* Order Section */}
        <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r border-[#444] bg-[#262626]">
          <div className="p-4 border-b border-[#444]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#f6b100]">Đơn hiện tại</h2>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">#ORD-001</span>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-[#1f1f1f] py-2 px-4 rounded-lg transition">
                <IoPerson className="inline mr-2" /> Khách hàng
              </button>
              <button className="flex-1 bg-[#444] hover:bg-[#555] text-[#f5f5f5] py-2 px-4 rounded-lg transition">
                <IoPricetag className="inline mr-2" /> Giảm giá
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-[#444]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Sản phẩm</span>
              <span className="text-gray-400">SL</span>
            </div>
            <div className="max-h-96 overflow-y-auto scrollbar-hide">
              <div className="text-center py-10 text-gray-500">
                <IoPricetag className="text-4xl mb-2 mx-auto" />
                <p>Chưa có sản phẩm</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-[#444] space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Tạm tính</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Giảm giá</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Thuế</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-[#444]">
              <span className="text-lg font-semibold">Tổng</span>
              <span className="text-lg font-semibold text-yellow-500">$0.00</span>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-[#444] hover:bg-[#555] text-[#f5f5f5] py-3 px-4 rounded-lg transition font-medium">
                <IoTrash className="inline mr-2" /> Xoá
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition font-medium">
                <IoCheckmarkCircle className="inline mr-2" /> Thanh toán
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/5">
          <div className="p-4 border-b border-[#444]">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <h2 className="text-xl font-semibold text-[#f6b100]">Dịch vụ giặt ủi</h2>
              <div className="flex flex-wrap gap-2">
                {["Tất cả", "Giặt", "Ủi", "Hấp"].map((label, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${idx === 0 ? "bg-yellow-500 text-[#1f1f1f]" : "bg-[#444] text-[#f5f5f5] hover:bg-[#555]"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#2a2a2a] border border-[#444] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="p-4 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Dịch vụ {i + 1}</h3>
                        <p className="text-sm text-gray-400">Mô tả ngắn</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Loại</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-semibold text-yellow-500">$5.00</span>
                      <button className="bg-yellow-100 text-yellow-800 p-2 rounded-full hover:bg-yellow-200 transition">
                        <IoAdd />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
