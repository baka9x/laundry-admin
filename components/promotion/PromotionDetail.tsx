"use client";
import { useEffect, useState } from "react";
import CreateServiceDialog from "./CreatePromotionDialog";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import UpdateServiceDialog from "./UpdatePromotionDialog";
import { Dialog } from "@headlessui/react";
import { IoAddCircle } from "react-icons/io5";
import { Promotion, PromotionsResponse } from "@/types/promotion";
import { getPromotions } from "@/services/promotion";
import CreatePromotionDialog from "./CreatePromotionDialog";
import UpdatePromotionDialog from "./UpdatePromotionDialog";

export default function PromotionDetail() {
  const [items, setItems] = useState<PromotionsResponse | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchPromotion = async () => {
    setLoading(true);
    try {
      const data = await getPromotions(false, {
        page: page,
        limit: limit,
      });
      if (!data || !data.data) {
        toast.error("Không có dữ liệu khuyến mại");
        return;
      }
      setItems(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPromotion();
  }, [page]);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <h1 className="text-[#f5f5f5] text-xl md:text-2xl font-semibold tracking-wide">
          Quản lý dịch vụ
        </h1>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-[#f5f5f5] font-semibold px-4 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
        >
          <IoAddCircle /> Thêm dịch vụ
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
                <p className="text-[#ababab] text-sm">
                  {item.discount_type} : {item.discount_value}
                </p>
                <p className="text-[#ababab] text-sm">
                  Min order: {item.min_order_value}
                </p>
                <p className="text-[#ababab] text-sm">
                  Ngày bắt đầu: {item.start_date}
                </p>
                <p className="text-[#ababab] text-sm">
                  Ngày kết thúc: {item.end_date}
                </p>
                <p className="text-[#ababab] text-sm">
                  Yêu cầu VIP: {item.priority_level_required}
                </p>
                <p className="text-[#ababab] text-sm">
                  Trạng thái:{" "}
                  {item.is_active ? "Đang kích hoạt" : "Không kích hoạt"}
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => {
                      setSelectedPromotion(item);
                      setShowUpdateDialog(true);
                    }}
                    className="text-yellow-500 hover:text-yellow-400"
                    title="Cập nhật"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPromotion(item);
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

      <CreatePromotionDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={() => {
          fetchPromotion(); // reload lại list sau khi thêm
          setShowAddDialog(false); // đóng dialog
        }}
      />
      {selectedPromotion && (
        <UpdatePromotionDialog
          open={showUpdateDialog}
          onClose={() => setShowUpdateDialog(false)}
          promotion={selectedPromotion}
          onUpdate={() => {
            fetchPromotion();
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
              Bạn có chắc muốn xoá dịch vụ:{" "}
              <span className="font-semibold text-[#f5f5f5]">
                {selectedPromotion?.name}
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
                  if (!selectedPromotion) return;
                  try {
                    await deleteService(false, selectedPromotion.id);
                    toast.success("Xoá thành công");
                    fetchPromotion();
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
