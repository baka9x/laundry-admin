"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { IoAddCircle } from "react-icons/io5";
import { Material, MaterialsResponse } from "@/types/material";
import { deleteMaterial, getMaterials } from "@/services/material";
import CreateMaterialDialog from "./CreateMaterialDialog";
import UpdateMaterialDialog from "./UpdateMaterialDialog";
import { useRouter } from "next/navigation";

export default function MaterialDetail() {

  const router = useRouter();

  const [items, setItems] = useState<MaterialsResponse | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchMaterial = async () => {
    setLoading(true);
    try {
      const data = await getMaterials(false, {
        page: page,
        limit: limit,
      });
      if (!data || !data.data) {
        toast.error("Không có dữ liệu nguyên liệu");
        return;
      }
      setItems(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMaterial();
  }, [page]);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Quản lý nguyên liệu
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
                transition-all duration-300 ease-in-out"
              >
                <h2 className="text-[#f5f5f5] text-lg font-semibold mb-2">
                  {item.name}
                </h2>
                <p className="text-[#8ecae6] font-bold text-sm mb-2">Đơn vị: {item.unit}</p>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => {
                      setSelectedMaterial(item);
                      setShowUpdateDialog(true);
                    }}
                    className="text-yellow-500 hover:text-yellow-400"
                    title="Cập nhật"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMaterial(item);
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

      <CreateMaterialDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={() => {
          fetchMaterial(); // reload lại list sau khi thêm
          setShowAddDialog(false); // đóng dialog
        }}
      />
      {selectedMaterial && (
        <UpdateMaterialDialog
          open={showUpdateDialog}
          onClose={() => setShowUpdateDialog(false)}
          material={selectedMaterial}
          onUpdate={() => {
            fetchMaterial();
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
              Bạn có chắc muốn xoá nguyên liệu:{" "}
              <span className="font-semibold text-[#f5f5f5]">
                {selectedMaterial?.name}
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
                  if (!selectedMaterial) return;
                  try {
                    await deleteMaterial(false, selectedMaterial.id);
                    toast.success("Xoá thành công");
                    fetchMaterial();
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
