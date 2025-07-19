"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { IoAddCircle } from "react-icons/io5";
import CreateCustomerDialog from "./CreateCustomerDialog";
import UpdateCustomerDialog from "./UpdateCustomerDialog";
import { Customer, CustomersResponse } from "@/types/customer";
import { deleteCustomer, getCustomers } from "@/services/customer";

export default function CustomerDetail() {
  const [items, setItems] = useState<CustomersResponse | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const data = await getCustomers(false, {
        page: page,
        limit: limit,
      });
      if (!data || !data.data) {
        toast.error("Không có dữ liệu khách hàng");
        return;
      }
      setItems(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, [page]);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Quản lý khách hàng
        </h1>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-[#f5f5f5] font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
        >
          <IoAddCircle /> Thêm
        </button>
      </div>

      <div className="px-6 md:px-10 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items &&
            items.data.map((item, index) => (
              <div
                key={index}
                className="bg-[#1f1f1f] p-4 rounded-lg shadow-md 
                hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1 
                transition-all duration-300 ease-in-out cursor-pointer"
              >
                <h2 className="text-[#f5f5f5] text-lg font-semibold mb-2">
                  {item.phone} ({item.name})
                </h2>
                <p className="text-[#ababab] text-sm">
                  Địa chỉ: {item.address}
                </p>
                <p className="text-[#ababab] text-sm">
                  Ghi chú: {item.note}
                </p>
                <p className="text-[#ababab] text-sm">
                  Ngày tạo: {item.created_at}
                </p>
                <p className="text-[#ababab] text-sm">
                  Số lần giặt: {item.total_washes || 0}
                </p>
                <p className="text-[#ababab] text-sm">
                  Cấp bậc: {item.priority_level}
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => {
                      setSelectedCustomer(item);
                      setShowUpdateDialog(true);
                    }}
                    className="text-yellow-500 hover:text-yellow-400"
                    title="Cập nhật"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomer(item);
                      setShowDeleteDialog(true);
                    }}
                    className="text-red-500 hover:text-red-400"
                    title="Xoá"
                  >
                    <BiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <CreateCustomerDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={() => {
          fetchCustomer(); // reload lại list sau khi thêm
          setShowAddDialog(false); // đóng dialog
        }}
      />
      {selectedCustomer && (
        <UpdateCustomerDialog
          open={showUpdateDialog}
          onClose={() => setShowUpdateDialog(false)}
          customer={selectedCustomer}
          onUpdate={() => {
            fetchCustomer();
            setShowUpdateDialog(false);
          }}
        />
      )}

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-xl w-80 space-y-4">
            <div className="text-[#f5f5f5] text-lg font-semibold">
              Xác nhận xoá
            </div>
            <p className="text-[#ababab] text-sm">
              Bạn có chắc muốn xoá khuyến mại:{" "}
              <span className="font-semibold text-[#f5f5f5]">
                {selectedCustomer?.name}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
              >
                Huỷ
              </button>
              <button
                onClick={async () => {
                  if (!selectedCustomer) return;
                  try {
                    await deleteCustomer(false, selectedCustomer.id);
                    toast.success("Xoá thành công");
                    fetchCustomer();
                    setShowDeleteDialog(false);
                  } catch (err) {
                    console.error(err);
                    toast.error("Xoá thất bại");
                  }
                }}
                className="px-3 py-1 bg-red-500 text-[#f5f5f5] rounded hover:bg-red-600 transition-all"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
