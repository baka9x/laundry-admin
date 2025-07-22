"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { updateService } from "@/services/service";
import toast from "react-hot-toast";
import { Service, ServiceInput } from "@/types/service";
import { Expense, ExpenseInput } from "@/types/expense";
import { updateExpense } from "@/services/expense";
import { IoClose } from "react-icons/io5";

interface UpdateExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  expense: Expense;
  onUpdate: () => void;
}

export default function UpdateExpenseDialog({
  open,
  onClose,
  expense,
  onUpdate,
}: UpdateExpenseDialogProps) {
  const [updateExpenseInput, setUpdateExpenseInput] = useState<ExpenseInput>({
    expense_type: "",
    amount: 0,
    expense_date: new Date(),
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [expenseTime, setExpenseTime] = useState("");

  useEffect(() => {
    if (expense) {
      setUpdateExpenseInput({
        expense_type: expense.expense_type,
        amount: expense.amount,
        expense_date: new Date(expense.expense_date),
        description: expense.description ?? "",
      });
    }
  }, [expense]);

  const handleUpdate = async () => {
    if (updateExpenseInput.expense_type.trim() === "") {
      toast.error("Vui lòng nhập tên chi phí");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo dịch vụ
      const result = await updateExpense(false, expense.id, {
        ...updateExpenseInput,
        expense_date: new Date(expenseTime),
      });
      toast.success("Cập nhật chi phí thành công");
      setUpdateExpenseInput({
        expense_type: "",
        amount: 0,
        expense_date: new Date(),
      });
      onUpdate();
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("Cập nhật chi phí thất bại");
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
                Sửa chi phí
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
                value={updateExpenseInput.expense_type}
                onChange={(e) =>
                  setUpdateExpenseInput({ ...updateExpenseInput, expense_type: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
              />
    
              <label className="block mb-1 mt-2 text-sm">Thông tin chi phí</label>
              <input
                type="text"
                placeholder="Mô tả chi tiết"
                value={updateExpenseInput.description}
                onChange={(e) =>
                  setUpdateExpenseInput({ ...updateExpenseInput, description: e.target.value })
                }
                className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
              />
    
              <label className="block mb-1 mt-2 text-sm">Số tiền</label>
              <input
                type="number"
                placeholder="Số tiền"
                value={updateExpenseInput.amount}
                onChange={(e) =>
                  setUpdateExpenseInput({
                    ...updateExpenseInput,
                    amount: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
              />
    
              <label className="block mb-1 mt-2 text-sm">Ngày thanh toán</label>
              <input
                type="datetime-local"
                value={expenseTime}
                onChange={(e) => setExpenseTime(e.target.value)}
                className="w-full p-2 rounded bg-[#343434] text-white"
              />
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
                >
                  {loading ? "Đang sửa..." : "Cập nhật"}
                </button>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 p-2 bg-gray-500 text-[#f5f5f5] font-semibold rounded hover:bg-gray-600 transition-all"
                >
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        </Dialog>
  );
}
