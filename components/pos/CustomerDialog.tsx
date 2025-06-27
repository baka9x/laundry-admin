'use client';
import React from 'react';

interface CustomerDialogProps {
  onClose: () => void;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-[#2a2a2a] rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Chọn khách hàng</h2>

        <input
          type="text"
          placeholder="Nhập số điện thoại..."
          className="w-full bg-[#1f1f1f] text-white px-4 py-2 rounded"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-sm text-[#ababab]">Đóng</button>
          <button className="bg-[#f6b100] px-4 py-2 rounded text-black font-semibold">
            Tạo mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDialog;