"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { IoAddCircle } from "react-icons/io5";
import CreateProductDialog from "./CreateProductDialog";
import UpdateProductDialog from "./UpdateProductDialog";
import { Product, ProductsResponse } from "@/types/product";
import { deleteProduct, getProducts } from "@/services/product";
import { formatVND } from "@/lib/formatVND";

export default function ProductDetail() {
  const [items, setItems] = useState<ProductsResponse | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 100;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(false, {
        type: "wash",
        page: page,
        limit: limit,
      });
      if (!data || !data.data) {
        toast.error("Không có dữ liệu sản phẩm");
        return;
      }
      console.log(data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Quản lý sản phẩm giặt sấy
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
                <h2 className="text-[#f5f5f5] text-lg font-bold mb-2 flex items-center tracking-wide">
                  <span className="bg-[#f6b100] text-[#1e1e1e] text-sm font-bold px-3 py-1 rounded-full shadow mr-2">#{item.id}</span>{item.name}
                </h2>
                {/* Hiển thị tên dịch vụ */}
                <p className="text-[#8ecae6] text-xs mb-1">
                  Dịch vụ: {item.service?.name || "Không có"}
                </p>

                <p className="text-[#ababab] text-sm mb-1">
                  Giá bán: <span className="font-bold text-green-300">{formatVND(item.price)} / {item.unit}</span>
                </p>

                <p className="text-[#ababab] text-sm mb-3">
                  Chi phí nguyên liệu:{" "}
                  <span className="font-bold text-red-300">{item.product_materials.length > 0
                    ? formatVND(item.product_materials
                      .reduce(
                        (sum, pm) =>
                          sum + (pm.material_batch?.unit_price ?? 0) * pm.quantity_used,
                        0
                      ))
                    : "0 đ"}</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[#ababab] text-sm">
                  {item.product_materials.length > 0 && item.product_materials.map((pm, index) => (
                    <span className="bg-[#444] px-2 py-1 mr-2 rounded-lg border" key={index}>
                      {pm.material_batch?.material.name} ({formatVND((pm.material_batch?.unit_price ?? 0) * pm.quantity_used)} /{pm.quantity_used} {pm.material_batch?.material.unit})</span>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-2">

                  <button
                    onClick={() => {
                      setSelectedProduct(item);
                      setShowUpdateDialog(true);
                    }}
                    className="text-yellow-500 hover:text-yellow-400"
                    title="Cập nhật"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(item);
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

      <CreateProductDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={() => {
          fetchProducts(); // reload lại list sau khi thêm
          setShowAddDialog(false); // đóng dialog
        }}
      />
      {selectedProduct && (
        <UpdateProductDialog
          open={showUpdateDialog}
          onClose={() => setShowUpdateDialog(false)}
          product={selectedProduct}
          onUpdate={() => {
            fetchProducts();
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
              Bạn có chắc muốn xoá sản phẩm:{" "}
              <span className="font-semibold text-[#f5f5f5]">
                {selectedProduct?.name}
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
                  if (!selectedProduct) return;
                  try {
                    await deleteProduct(false, selectedProduct.id);
                    toast.success("Xoá thành công");
                    fetchProducts();
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
