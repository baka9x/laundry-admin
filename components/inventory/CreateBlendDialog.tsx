"use client";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { createCoffeeBlendBatch } from "@/services/coffeeBlendBatch";
import { getMaterials } from "@/services/material";
import { Material } from "@/types/material";

interface CreateBlendDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

interface MaterialWeight {
  material_id: number;
  weight: string;
}

export default function CreateBlendDialog({ open, onClose, onAdd }: CreateBlendDialogProps) {
  const [blendName, setBlendName] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [materialWeights, setMaterialWeights] = useState<MaterialWeight[]>([{ material_id: 0, weight: "" }]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchMaterials = async () => {
        setLoading(true);
        try {
          const response = await getMaterials(false, {limit: 100});
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
    setLoading(true);

    const totalWeightNum = parseFloat(totalWeight);
    const materialWeightsNum = materialWeights.reduce((acc, item) => {
      const materialId = item.material_id;
      const weight = parseFloat(item.weight);
      if (materialId > 0 && weight > 0) {
        acc[materialId] = weight;
      }
      return acc;
    }, {} as { [key: number]: number });

    const selectedMaterialIds = materialWeights.map((item) => item.material_id);
    const uniqueMaterialIds = new Set(selectedMaterialIds.filter((id) => id > 0));
    if (uniqueMaterialIds.size < selectedMaterialIds.filter((id) => id > 0).length) {
      toast.error("Không được chọn trùng nguyên liệu");
      setLoading(false);
      return;
    }

    const sumWeights = Object.values(materialWeightsNum).reduce((sum, weight) => sum + weight, 0);
    if (sumWeights !== totalWeightNum) {
      toast.error("Tổng trọng lượng nguyên liệu phải bằng tổng trọng lượng hỗn hợp");
      setLoading(false);
      return;
    }

    if (!blendName || totalWeightNum <= 0 || Object.keys(materialWeightsNum).length === 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin hợp lệ");
      setLoading(false);
      return;
    }

    try {
      await createCoffeeBlendBatch(false, {
        blend_name: blendName,
        total_weight: totalWeightNum,
        material_weights: materialWeightsNum,
      });
      toast.success("Thêm hỗn hợp thành công");
      setBlendName("");
      setTotalWeight("");
      setMaterialWeights([{ material_id: 0, weight: "" }]);
      onAdd();
    } catch (err) {
      console.error(err);
      toast.error("Thêm hỗn hợp thất bại");
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
            Thêm hỗn hợp vào kho
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-[#ababab]">Tên hỗn hợp</label>
            <input
              type="text"
              value={blendName}
              onChange={(e) => setBlendName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
              placeholder="Nhập tên hỗn hợp"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#ababab]">Tổng trọng lượng (g)</label>
            <input
              type="number"
              step="0.01"
              value={totalWeight}
              onChange={(e) => setTotalWeight(e.target.value)}
              className="w-full px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
              placeholder="Nhập tổng trọng lượng"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-[#ababab]">Nguyên liệu</label>
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
                    className="flex-1 px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
                    required
                  >
                    <option value="0" disabled>
                      Chọn nguyên liệu
                    </option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name} ({material.unit})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Trọng lượng (g)"
                    value={item.weight}
                    onChange={(e) => handleMaterialChange(index, "weight", e.target.value)}
                    className="flex-1 px-3 py-2 rounded bg-[#1f1f1f] text-[#f5f5f5] border border-[#444] focus:outline-none"
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
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 p-2 bg-yellow-500 text-[#1f1f1f] font-semibold rounded hover:bg-yellow-600 transition-all disabled:bg-yellow-700"
            >
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 p-2 bg-gray-500 text-[#f5f5f5] font-semibold rounded hover:bg-gray-600 transition-all disabled:bg-gray-700"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}