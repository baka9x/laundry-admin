"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { createProduct } from "@/services/product";
import { getServices } from "@/services/service";
import toast from "react-hot-toast";
import { ProductInput } from "@/types/product";
import { Service } from "@/types/service";
import { createNotification } from "@/services/notification";
import { IoClose } from "react-icons/io5";

interface CreateProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export default function CreateProductDialog({
  open,
  onClose,
  onAdd,
}: CreateProductDialogProps) {
  const [newProduct, setNewProduct] = useState<ProductInput>({
    service_id: 0,
    name: "",
    price: 0,
    unit: "",
  });
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  // const [selectedService, setSelectedService] = useState<string>("")

  // Fetch list dịch vụ khi dialog mở
  useEffect(() => {
    if (open) {
      fetchServices();
    }
  }, [open]);

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

  const handleAddNotification = async () => {
    try {
      await createNotification(false, {
        title: `Sản phẩm ${newProduct.name.trim()} đã được tạo`,
        content: `Sản phẩm ${newProduct.name.trim()} - 
        Service_id: ${newProduct.service_id} - 
        Giá: ${newProduct.price}đ / ${newProduct.unit}`,
        type: "system",
      });
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  const handleAdd = async () => {
    if (newProduct.name.trim() === "" || newProduct.service_id === 0) {
      toast.error("Vui lòng nhập tên sản phẩm và chọn dịch vụ");
      return;
    }
    setLoading(true);
    try {
      await createProduct(false, newProduct);
      await handleAddNotification();
      toast.success("Thêm sản phẩm thành công");
      setNewProduct({
        service_id: 0,
        name: "",
        price: 0,
        unit: "",
      });
      onAdd(); // reload list + đóng dialog
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Thêm sản phẩm thất bại");
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
            Tạo sản phẩm mới
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 mt-2 text-sm">Chọn dịch vụ</label>
          <select
            value={newProduct.service_id}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
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
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Giá sản phẩm (đ)</label>
          <input
            type="number"
            placeholder="Giá sản phẩm (đ)"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
          />

          <label className="block mb-1 mt-2 text-sm">Chọn đơn vị</label>
          <select
            value={newProduct.unit}
            onChange={(e) =>
              setNewProduct({ ...newProduct, unit: e.target.value })
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
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all"
            >
              {loading ? "Đang thêm..." : "Thêm"}
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
