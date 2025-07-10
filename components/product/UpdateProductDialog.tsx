"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { updateService } from "@/services/service";
import toast from "react-hot-toast";
import { Product, ProductInput } from "@/types/product";
import { updateProduct } from "@/services/product";

interface UpdateProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onUpdate: () => void;
}

export default function UpdateProductDialog({
  open,
  onClose,
  product,
  onUpdate,
}: UpdateProductDialogProps) {
  const [updateProductInput, setUpdateProductInput] = useState<ProductInput>({
    service_id: product.service_id,
    name: product.name,
    price: product.price,
    unit: product.unit,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setUpdateProductInput({
        service_id: product.service_id,
        name: product.name,
        price: product.price,
        unit: product.unit,
      });
    }
  }, [product]);

  const handleUpdate = async () => {
    if (updateProductInput.name.trim() === "") {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để tạo dịch vụ
      const result = await updateProduct(false, product.id, updateProductInput);
      toast.success("Cập nhật sản phẩm thành công");
      setUpdateProductInput({ service_id: 0, name: "", price: 0, unit: "" });
      onUpdate();
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Cập nhật sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-xl w-80 space-y-4">
          <div className="text-[#f5f5f5] text-lg font-semibold">
            Sửa dịch vụ
          </div>
          <input
            type="text"
            placeholder="Tên dịch vụ"
            value={updateProductInput.name}
            onChange={(e) =>
              setUpdateProductInput({
                ...updateProductInput,
                name: e.target.value,
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <input
            type="number"
            placeholder="Giá"
            value={updateProductInput.price}
            onChange={(e) =>
              setUpdateProductInput({
                ...updateProductInput,
                price: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
            >
              Huỷ
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-3 py-1 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang sửa..." : "Cập nhật"}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
