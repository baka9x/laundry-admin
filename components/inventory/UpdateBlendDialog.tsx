"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { updateCoffeeBlendBatch } from "@/services/coffeeBlendBatch";
import { getMaterials } from "@/services/material";
import { Material } from "@/types/material";
import { BlendInventory } from "@/types/inventory";

interface UpdateBlendDialogProps {
  open: boolean;
  onClose: () => void;
  blendInventory: BlendInventory;
  onUpdate: () => void;
}

interface MaterialWeight {
  material_id: number;
  weight: string;
}

export default function UpdateBlendDialog({ open, onClose, blendInventory, onUpdate }: UpdateBlendDialogProps) {
  const [blendBatchId, setBlendBatchId] = useState(blendInventory.blend_id.toString());
  const [blendName, setBlendName] = useState(blendInventory.coffee_blend.name);
  const [totalWeight, setTotalWeight] = useState(blendInventory.total_quantity.toString());
  const [materialWeights, setMaterialWeights] = useState<MaterialWeight[]>([{ material_id: 0, weight: "" }]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);

  // Tải danh sách nguyên liệu khi dialog mở
  useEffect(() => {
    if (open) {
      const fetchMaterials = async () => {
        setLoading(true);
        try {
          const response = await getMaterials(false, { limit: 100 });
          setMaterials(response.data || []);
        } catch (err) {
          console.error("Error fetching materials:", err);
          toast.error("Lỗi khi tải danh sách nguyên liệu");
        } finally {
          setLoading(false);
        }
      };
      fetchMaterials();
    }
  }, [open]);

  const handleAddMaterial = () => {
    setMaterialWeights([...materialWeights, { material_id: 0, weight: "" }]);
  };

  const handleMaterialChange = (index: number, field: "material_id" | "weight", value: string) => {
    const newMaterialWeights = [...materialWeights];
    if (field === "material_id") {
      newMaterialWeights[index].material_id = parseInt(value);
    } else {
      newMaterialWeights[index].weight = value;
    }
    setMaterialWeights(newMaterialWeights);
  };

  const handleRemoveMaterial = (index: number) => {
    if (materialWeights.length > 1) {
      setMaterialWeights(materialWeights.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blendBatchIdNum = parseInt(blendBatchId);
    const totalWeightNum = parseFloat(totalWeight);

    // Kiểm tra dữ liệu hợp lệ
    const materialWeightsNum = materialWeights.reduce((acc, item) => {
      const materialId = item.material_id;
      const weight = parseFloat(item.weight);
      if (materialId > 0 && weight > 0) {
        acc[materialId] = weight;
      }
      return acc;
    }, {} as { [key: number]: number });

    // Kiểm tra trùng lặp nguyên liệu
    const selectedMaterialIds = materialWeights.map((item) => item.material_id);
    const uniqueMaterialIds = new Set(selectedMaterialIds.filter((id) => id > 0));
    if (uniqueMaterialIds.size < selectedMaterialIds.filter((id) => id > 0).length) {
      toast.error("Không được chọn trùng nguyên liệu");
      return;
    }

    // Kiểm tra tổng trọng lượng
    const sumWeights = Object.values(materialWeightsNum).reduce((sum, weight) => sum + weight, 0);
    if (sumWeights !== totalWeightNum) {
      toast.error("Tổng trọng lượng nguyên liệu phải bằng tổng trọng lượng hỗn hợp");
      return;
    }

    if (!blendBatchIdNum || !blendName || totalWeightNum <= 0 || Object.keys(materialWeightsNum).length === 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin hợp lệ");
      return;
    }

    try {
      await updateCoffeeBlendBatch(false, blendBatchIdNum, {
        blend_name: blendName,
        total_weight: totalWeightNum,
        material_weights: materialWeightsNum,
      });
      toast.success("Cập nhật hỗn hợp thành công");
      onUpdate();
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật hỗn hợp thất bại");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-xl w-96 space-y-4">
          <Dialog.Title className="text-[#f5f5f5] text-lg font-semibold">
            Cập nhật hỗn hợp: {blendInventory.coffee_blend.name}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#ababab] text-sm">ID Lô hỗn hợp</label>
              <input
                type="number"
                value={blendBatchId}
                onChange={(e) => setBlendBatchId(e.target.value)}
                className="w-full bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2 mt-1"
                placeholder="Nhập ID lô hỗn hợp"
                required
              />
            </div>
            <div>
              <label className="text-[#ababab] text-sm">Tên hỗn hợp</label>
              <input
                type="text"
                value={blendName}
                onChange={(e) => setBlendName(e.target.value)}
                className="w-full bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2 mt-1"
                placeholder="Nhập tên hỗn hợp"
                required
              />
            </div>
            <div>
              <label className="text-[#ababab] text-sm">Tổng trọng lượng (kg)</label>
              <input
                type="number"
                step="0.01"
                value={totalWeight}
                onChange={(e) => setTotalWeight(e.target.value)}
                className="w-full bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2 mt-1"
                placeholder="Nhập tổng trọng lượng"
                required
              />
            </div>
            <div>
              <label className="text-[#ababab] text-sm">Nguyên liệu</label>
              {loading ? (
                <p className="text-[#8ecae6] text-sm">Đang tải nguyên liệu...</p>
              ) : materials.length === 0 ? (
                <p className="text-red-400 text-sm">Không có nguyên liệu nào</p>
              ) : (
                materialWeights.map((item, index) => (
                  <div key={index} className="flex gap-2 mt-2 items-center">
                    <select
                      value={item.material_id}
                      onChange={(e) => handleMaterialChange(index, "material_id", e.target.value)}
                      className="w-1/2 bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2"
                      required
                    >
                      <option value="0" disabled>
                        Chọn nguyên liệu
                      </option>
                      {materials.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Trọng lượng (kg)"
                      value={item.weight}
                      onChange={(e) => handleMaterialChange(index, "weight", e.target.value)}
                      className="w-1/2 bg-[#1f1f1f] text-[#f5f5f5] rounded-lg p-2"
                      required
                    />
                    {materialWeights.length > 1 && (
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
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1 bg-[#444] text-[#f5f5f5] rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-[#f5f5f5] rounded hover:bg-green-600"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}