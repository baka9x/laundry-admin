"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import { Material, MaterialBatch } from "@/types/material";
import { BlendInventoriesResponse, BlendInventory, InventoriesResponse } from "@/types/inventory";
import { getBlendInventories, getInventories } from "@/services/inventory";
import { deleteMaterialBatch } from "@/services/materialBatch";
import { deleteCoffeeBlendBatch } from "@/services/coffeeBlendBatch";
import { deleteMaterial } from "@/services/material";
import CreateMaterialDialog from "./CreateMaterialDialog";
import UpdateMaterialDialog from "./UpdateMaterialDialog";
import CreateBlendDialog from "./CreateBlendDialog";
import UpdateBlendDialog from "./UpdateBlendDialog";
import { formatVND } from "@/lib/formatVND";

export default function InventoryDetail() {
  const [inventories, setInventories] = useState<InventoriesResponse | null>(null);
  const [blendInventories, setBlendInventories] = useState<BlendInventoriesResponse | null>(null);
  const [showAddMaterialDialog, setShowAddMaterialDialog] = useState(false);
  const [showUpdateMaterialDialog, setShowUpdateMaterialDialog] = useState(false);
  const [showAddBlendDialog, setShowAddBlendDialog] = useState(false);
  const [showUpdateBlendDialog, setShowUpdateBlendDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Material | MaterialBatch | BlendInventory | null>(null);
  const [deleteType, setDeleteType] = useState<"material" | "blend" | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inventoryData, blendInventoryData] = await Promise.all([
        getInventories(false, { page, limit }),
        getBlendInventories(false, { page, limit }),
      ]);
      if (!inventoryData || !inventoryData.data) {
        toast.error("Không có dữ liệu kho nguyên liệu");
      } else {
        setInventories(inventoryData);
      }
      if (!blendInventoryData || !blendInventoryData.data) {
        toast.error("Không có dữ liệu kho hỗn hợp");
      } else {
        setBlendInventories(blendInventoryData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi khi tải dữ liệu kho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async () => {
    if (!selectedItem || !deleteType) return;
    try {
      if (deleteType === "material") {
        await deleteMaterial(false, (selectedItem as Material).id);
        toast.success("Xóa nguyên liệu thành công");
      } else if (deleteType === "blend") {
        await deleteCoffeeBlendBatch(false, (selectedItem as BlendInventory).blend_id);
        toast.success("Xóa hỗn hợp thành công");
      }
      fetchData();
      setShowDeleteDialog(false);
    } catch (err) {
      console.error(err);
      toast.error("Xóa thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5]">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
          Quản lý kho
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddMaterialDialog(true)}
            className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-[#f5f5f5] font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <IoAddCircle /> Thêm nguyên liệu
          </button>
          <button
            onClick={() => setShowAddBlendDialog(true)}
            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-[#f5f5f5] font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <IoAddCircle /> Thêm hỗn hợp
          </button>
        </div>
      </div>

      <div className="px-6 md:px-10 py-4">
        {loading && <p className="text-center text-[#8ecae6]">Đang tải...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {inventories && inventories.data.map((inventory) => (
            <div
              key={inventory.material_id}
              className={`bg-[#1f1f1f] p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-in-out ${
                inventory.total_quantity < 10 ? "border-2 border-red-500" : ""
              }`}
            >
              <h2 className="text-[#f5f5f5] text-lg font-semibold mb-2">
                {inventory.material.name}
              </h2>
              <p className={`font-bold text-sm mb-2 ${
                inventory.total_quantity < 10 ? "text-red-400" : "text-[#8ecae6]"
              }`}>
                Tồn kho: {inventory.total_quantity} {inventory.material.unit}
              </p>
               <p className="text-[#8ecae6] text-sm mb-2">
                Giá trung bình: {formatVND(inventory.average_cost_per_unit)} / {inventory.material.unit}
              </p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedItem(inventory.material);
                    setShowUpdateMaterialDialog(true);
                  }}
                  className="text-yellow-500 hover:text-yellow-400"
                  title="Cập nhật"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(inventory.material);
                    setDeleteType("material");
                    setShowDeleteDialog(true);
                  }}
                  className="text-red-500 hover:text-red-400"
                  title="Xóa"
                >
                  <BiTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {blendInventories && blendInventories.data.map((blendInventory) => (
            <div
              key={blendInventory.blend_id}
              className={`bg-[#1f1f1f] p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-in-out ${
                blendInventory.total_quantity < 5 ? "border-2 border-red-500" : ""
              }`}
            >
              <h2 className="text-[#f5f5f5] text-lg font-semibold mb-2">
                #{blendInventory.coffee_blend.id} {blendInventory.coffee_blend.name}
              </h2>
              <p className={`font-bold text-sm mb-2 ${
                blendInventory.total_quantity < 5 ? "text-red-400" : "text-[#8ecae6]"
              }`}>
                Tồn kho: {blendInventory.total_quantity} {blendInventory.coffee_blend.unit}
              </p>
              <p className="text-[#8ecae6] text-sm mb-2">
                Giá trung bình: {formatVND(blendInventory.average_cost_per_unit)} / {blendInventory.coffee_blend.unit}
              </p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedItem(blendInventory);
                    setShowUpdateBlendDialog(true);
                  }}
                  className="text-yellow-500 hover:text-yellow-400"
                  title="Cập nhật"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedItem(blendInventory);
                    setDeleteType("blend");
                    setShowDeleteDialog(true);
                  }}
                  className="text-red-500 hover:text-red-400"
                  title="Xóa"
                >
                  <BiTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateMaterialDialog
        open={showAddMaterialDialog}
        onClose={() => setShowAddMaterialDialog(false)}
        onAdd={() => {
          fetchData();
          setShowAddMaterialDialog(false);
        }}
      />
      {selectedItem && deleteType === "material" && (
        <UpdateMaterialDialog
          open={showUpdateMaterialDialog}
          onClose={() => setShowUpdateMaterialDialog(false)}
          material={selectedItem as Material}
          onUpdate={() => {
            fetchData();
            setShowUpdateMaterialDialog(false);
          }}
        />
      )}
      <CreateBlendDialog
        open={showAddBlendDialog}
        onClose={() => setShowAddBlendDialog(false)}
        onAdd={() => {
          fetchData();
          setShowAddBlendDialog(false);
        }}
      />
      {selectedItem && deleteType === "blend" && (
        <UpdateBlendDialog
          open={showUpdateBlendDialog}
          onClose={() => setShowUpdateBlendDialog(false)}
          blendInventory={selectedItem as BlendInventory}
          onUpdate={() => {
            fetchData();
            setShowUpdateBlendDialog(false);
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
              Xác nhận xóa
            </div>
            <p className="text-[#ababab] text-sm">
              Bạn có chắc muốn xóa {deleteType === "material" ? "nguyên liệu" : "hỗn hợp"}:{" "}
              <span className="font-semibold text-[#f5f5f5]">
                {deleteType === "material" ? (selectedItem as Material)?.name : (selectedItem as BlendInventory)?.coffee_blend.name}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-[#f5f5f5] rounded hover:bg-red-600 transition-all"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}