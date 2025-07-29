"use client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { createProduct } from "@/services/product";
import { getServices } from "@/services/service";
import { getMaterialBatches } from "@/services/materialBatch";
import toast from "react-hot-toast";
import { ProductInput } from "@/types/product";
import { Service } from "@/types/service";
import { MaterialBatch, ProductMaterialInput } from "@/types/material";
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
    product_materials: [],
  });
  const [materialInputs, setMaterialInputs] = useState<ProductMaterialInput[]>([
    { batch_id: 0, quantity_used: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [materialBatches, setMaterialBatches] = useState<MaterialBatch[]>([]);

  // Fetch dịch vụ và material batches khi dialog mở
  useEffect(() => {
    if (open) {
      fetchServices();
      fetchMaterialBatches();
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

  const fetchMaterialBatches = async () => {
    try {
      const res = await getMaterialBatches(false, { limit: 100 });
      if (res && res.data) {
        setMaterialBatches(res.data);
      }
    } catch (error) {
      console.error("Error fetching material batches:", error);
      toast.error("Không lấy được danh sách lô nguyên liệu");
    }
  };

  const handleAddMaterial = () => {
    setMaterialInputs([...materialInputs, { batch_id: 0, quantity_used:  0}]);
  };

  const handleMaterialChange = (
    index: number,
    field: "batch_id" | "quantity_used",
    value: string
  ) => {
    const newMaterialInputs = [...materialInputs];
    if (field === "batch_id") {
      newMaterialInputs[index][field] = Number(value) as any;
    } else {
      newMaterialInputs[index][field] = Number(value) as any;
    }
    setMaterialInputs(newMaterialInputs);
  };

  const handleRemoveMaterial = (index: number) => {
    if (materialInputs.length > 1) {
      setMaterialInputs(materialInputs.filter((_, i) => i !== index));
    }
  };

  const handleAddNotification = async () => {
    try {
      await createNotification(false, {
        title: `Sản phẩm ${newProduct.name.trim()} đã được tạo`,
        content: `Sản phẩm ${newProduct.name.trim()} - Service_id: ${newProduct.service_id} - Giá: ${newProduct.price}đ / ${newProduct.unit}`,
        type: "system",
      });
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  const handleAdd = async () => {
    if (newProduct.name.trim() === "" || newProduct.service_id === 0 || newProduct.unit === "") {
      toast.error("Vui lòng nhập tên sản phẩm, chọn dịch vụ và đơn vị");
      return;
    }

    const productMaterials = materialInputs
      .filter((mi) => (mi.batch_id ?? 0) > 0 && mi.quantity_used > 0)
      .map((mi) => ({
        batch_id: mi.batch_id,
        quantity_used: mi.quantity_used,
      }));

    if (productMaterials.length === 0) {
      toast.error("Vui lòng chọn ít nhất một lô nguyên liệu và số lượng sử dụng");
      return;
    }

    // Validate quantity_used <= remaining_quantity
    for (const pm of productMaterials) {
      const batch = materialBatches.find((b) => b.id === pm.batch_id);
      if (!batch || pm.quantity_used > batch.remaining_quantity) {
        toast.error(`Số lượng sử dụng vượt quá tồn kho của lô ${batch?.id}`);
        return;
      }
    }

    setLoading(true);
    try {
      await createProduct(false, {
        ...newProduct,
        product_materials: productMaterials,
      });
      await handleAddNotification();
      toast.success("Thêm sản phẩm thành công");
      setNewProduct({
        service_id: 0,
        name: "",
        price: 0,
        unit: "",
        product_materials: [],
      });
      setMaterialInputs([{ batch_id: 0, quantity_used: 0 }]);
      onAdd();
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
          <h2 className="text-xl font-bold text-[#f6b100]">Tạo sản phẩm mới</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <div>
          <label className="block mb-1 text-sm text-[#ababab]">Chọn dịch vụ</label>
          <select
            value={newProduct.service_id}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                service_id: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
            required
          >
            <option value={0} disabled>
              -- Chọn dịch vụ --
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>

          <label className="block mb-1 mt-2 text-sm text-[#ababab]">Tên sản phẩm</label>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
            required
          />

          <label className="block mb-1 mt-2 text-sm text-[#ababab]">Giá sản phẩm (đ)</label>
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
            required
          />

          <label className="block mb-1 mt-2 text-sm text-[#ababab]">Chọn đơn vị</label>
          <select
            value={newProduct.unit}
            onChange={(e) =>
              setNewProduct({ ...newProduct, unit: e.target.value })
            }
            className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
            required
          >
            <option value="" disabled>
              -- Chọn đơn vị --
            </option>
            <option value="Cái">Cái</option>
            <option value="Lần">Lần</option>
            <option value="Con">Con</option>
            <option value="Kg">Kg</option>
            <option value="Đôi">Đôi</option>
            <option value="Lượt">Lượt</option>
          </select>

          <label className="block mb-1 mt-2 text-sm text-[#ababab]">Nguyên liệu sử dụng</label>
          {loading ? (
            <p className="text-[#8ecae6] text-sm">Đang tải lô nguyên liệu...</p>
          ) : materialBatches.length === 0 ? (
            <p className="text-red-400 text-sm">Không có lô nguyên liệu nào</p>
          ) : (
            materialInputs.map((item, index) => (
              <div key={index} className="flex gap-2 mt-2 items-center">
                <select
                  value={item.batch_id ?? 0}
                  onChange={(e) => handleMaterialChange(index, "batch_id", e.target.value)}
                  className="flex-1 px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
                  required
                >
                  <option value={0} disabled>
                    Chọn lô nguyên liệu
                  </option>
                  {materialBatches.map((batch) => (
                    <option key={batch.id} value={batch.id}>
                      {batch.material.name} (Lô {new Date(batch.import_date).toLocaleString()}, Tồn: {batch.remaining_quantity} {batch.material.unit})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Số lượng"
                  value={item.quantity_used}
                  onChange={(e) => handleMaterialChange(index, "quantity_used", e.target.value)}
                  className="flex-1 px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
                  required
                />
                {materialInputs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    X
                  </button>
                )}
              </div>
            ))
          )}
          <button
            type="button"
            onClick={handleAddMaterial}
            className="mt-2 text-yellow-500 hover:text-yellow-400"
          >
            + Thêm nguyên liệu
          </button>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all disabled:bg-yellow-700"
            >
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 p-2 bg-gray-500 text-[#f5f5f5] font-semibold rounded hover:bg-gray-600 transition-all disabled:bg-gray-700"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}