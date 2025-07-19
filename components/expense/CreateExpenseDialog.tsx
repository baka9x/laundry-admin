"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ExpenseInput } from "@/types/expense";
import { createExpense } from "@/services/expense";
import { IoClose } from "react-icons/io5";

interface CreateExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreateExpenseDialog({
  open,
  onClose,
  onAdd,
}: CreateExpenseDialogProps) {
  const [newExpense, setNewExpense] = useState<ExpenseInput>({
    expense_type: "",
    amount: 0,
    expense_date: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [expenseTime, setExpenseTime] = useState("");

  const handleAdd = async () => {
    if (newExpense.expense_type.trim() === "") {
      toast.error("Vui lòng nhập tên chi phí");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo dịch vụ
      const result = await createExpense(false, {
        expense_type: newExpense.expense_type,
        amount: newExpense.amount,
        expense_date: newExpense.expense_date,
        description: newExpense.description
      });
      toast.success("Thêm chi phí thành công");
      setNewExpense({
        expense_type: "",
        amount: 0,
        expense_date: new Date(),
      });
      onAdd();
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Thêm chi phí thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-[#262626] text-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#f6b100]">
            Tạo chi phí mới
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm">Tên chi phí</label>
          <input
            type="text"
            placeholder="Tên chi phí"
            value={newExpense.expense_type}
            onChange={(e) =>
              setNewExpense({ ...newExpense, expense_type: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Thông tin chi phí</label>
          <input
            type="text"
            placeholder="Mô tả chi tiết"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Số tiền</label>
          <input
            type="number"
            placeholder="Số tiền"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({
                ...newExpense,
                amount: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Ngày mua</label>
          <input
            type="datetime-local"
            value={expenseTime}
            onChange={(e) => setExpenseTime(e.target.value)}
            className="p-2 rounded bg-[#343434] text-white"
          />
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 px-3 py-1 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
