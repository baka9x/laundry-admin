"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { IoAddCircle } from "react-icons/io5";
import { CustomerRole, CustomerRolesResponse } from "@/types/customerRole";
import { deleteCustomerRole, getCustomerRoles } from "@/services/customerRole";
import CreateCustomerRoleDialog from "./CreateCustomerRoleDialog";
import UpdateCustomerRoleDialog from "./UpdateCustomerRoleDialog";

export default function CustomerRoleDetail() {
  const [items, setItems] = useState<CustomerRolesResponse | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCustomerRole, setSelectedCustomerRole] = useState<CustomerRole | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchCustomerRole = async () => {
    setLoading(true);
    try {
      const data = await getCustomerRoles(false, {
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
    fetchCustomerRole();
  }, [page]);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Quản lý danh hiệu khách hàng
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
                  {item.name}
                </h2>
                <div className="grid grid-cols-2 gap-y-2 text-sm max-w-md">
                  <div className="text-[#ababab] font-medium">Mô tả:</div>
                  <div className="text-[#8ecae6]">{item.description}</div>

                  <div className="text-[#ababab] font-medium">Số lần giặt tối thiểu:</div>
                  <div className="text-[#f5f5f5] font-bold">
                    {item.min_required || 0}
                  </div>
                  <div className="text-[#ababab] font-medium">Số lần giặt tối đa:</div>
                  <div className="text-[#f5f5f5] font-bold">
                    {item.max_required || 0}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => {
                      setSelectedCustomerRole(item);
                      setShowUpdateDialog(true);
                    }}
                    className="text-yellow-500 hover:text-yellow-400"
                    title="Cập nhật"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomerRole(item);
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

      <CreateCustomerRoleDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={() => {
          fetchCustomerRole(); // reload lại list sau khi thêm
          setShowAddDialog(false); // đóng dialog
        }}
      />
      {selectedCustomerRole && (
        <UpdateCustomerRoleDialog
          open={showUpdateDialog}
          onClose={() => setShowUpdateDialog(false)}
          customerRole={selectedCustomerRole}
          onUpdate={() => {
            fetchCustomerRole();
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
              Bạn có chắc muốn xoá danh hiệu:{" "}
              <span className="font-semibold text-[#f5f5f5]">
                {selectedCustomerRole?.name}
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
                  if (!selectedCustomerRole) return;
                  try {
                    await deleteCustomerRole(false, selectedCustomerRole.id);
                    toast.success("Xoá thành công");
                    fetchCustomerRole();
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
