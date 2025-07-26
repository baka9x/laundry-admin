export const BACKEND_URL = "http://192.168.1.153:5000";
export const FRONTEND_URL = "http://192.168.1.153:3000";
export const CDN_URL = "http://192.168.1.153:5000";

export const dateOptions = [
  { value: "", label: "Tất cả" },
  { value: "today", label: "Hôm nay" },
  { value: "week", label: "Tuần này" },
  { value: "month", label: "Tháng này" },
];

export const statusOptions = [
  { value: "", label: "Tất cả" },
  { value: "pending", label: "Đang chờ" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Đã giặt xong" },
  { value: "deliveried", label: "Đã giao" },
  { value: "cancelled", label: "Đã huỷ" },
];