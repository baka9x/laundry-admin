"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { getServices } from "@/services/service";
import toast from "react-hot-toast";
import { Product, ProductInput } from "@/types/product";
import { updateProduct } from "@/services/product";
import { IoClose } from "react-icons/io5";
import { Service } from "@/types/service";

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
  const [services, setServices] = useState<Service[]>([]);
  const [updateProductInput, setUpdateProductInput] = useState<ProductInput>({
    service_id: product.service_id,
    name: product.name,
    price: product.price,
    unit: product.unit,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (open) {
      fetchServices();
      if (product) {
        setUpdateProductInput({
          service_id: product.service_id,
          name: product.name,
          price: product.price,
          unit: product.unit,
        });
      }
    }
  }, [open, product]);

  const fetchServices = async () => {
    try {
      const res = await getServices(false, { type: "wash", page: 1, limit: 100 });
      if (res && res.data) {
        setServices(res.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Không lấy được danh sách dịch vụ");
    }
  };

  const handleUpdate = async () => {
    if (updateProductInput.name.trim() === "") {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    setLoading(true);
    try {
      // Gọi API để sửa sản phẩm
      await updateProduct(false, product.id, updateProductInput);
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
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-[#262626] text-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#f6b100]">
            Sửa sản phẩm
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 mt-2 text-sm">Chọn dịch vụ</label>
          <select
            value={updateProductInput.service_id}
            onChange={(e) =>
              setUpdateProductInput({
                ...updateProductInput,
                service_id: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            <option value={0}>-- Chọn dịch vụ --</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <label className="block mb-1 text-sm">Tên sản phẩm</label>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={updateProductInput.name}
            onChange={(e) =>
              setUpdateProductInput({ ...updateProductInput, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Giá sản phẩm (đ)</label>
          <input
            type="number"
            placeholder="Giá sản phẩm (đ)"
            value={updateProductInput.price}
            onChange={(e) =>
              setUpdateProductInput({
                ...updateProductInput,
                price: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Chọn đơn vị</label>

          <select
            value={updateProductInput.unit}
            onChange={(e) =>
              setUpdateProductInput({ ...updateProductInput, unit: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          >
            <option value="">-- Chọn đơn vị --</option>
            <option value="Cái">Cái</option>
            <option value="Lần">Lần</option>
            <option value="Con">Con</option>
            <option value="Kg">Kg</option>
            <option value="Đôi">Đôi</option>
            <option value="Lượt">Lượt</option>
          </select>

          <div className="flex gap-2 mt-4">
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
