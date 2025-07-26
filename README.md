
Tạo thêm trang Đồ thống kê đơn đồ uống /drink-order/info

Viết thêm trang detail

wash-products/[id]/page.tsx Hiển thị thông tin 

- Danh sách customer [số điện thoại, tên]
- Số đơn được tạo
- Doanh thu

customers/[id]/page.tsx

- Danh sách đơn hàng (Có nút hiển thị dialog invoice)


/drink-products/[id]/page.tsx

- Danh sách đơn được tạo
- Doanh thu

-- Click "Xem chi tiết" trong /wash-order hiện Dialog Invoice

-- Viết tiếp khuyến mại tự động theo min order

---- BUG

Trong tính tiền WASHPOS

khi tính tiền lại thì sẽ xoá tất cả wash_items của order_id, tính tiền lại

Xử lý ở nút checkOut washPOS

Sắp xếp theo updated_at, khi cập nhật

Bảng nguyên liệu
marterials
Ly Nhựa - cái
Nước giặt - ml
Bọc - kg
Ống hút - g
Cà phê - g
Sữa - ml

Bảng expenses: Chi phí cố định theo tháng
Điện tháng 7 - 1tr

Bảng imports: Chi phí nhập nguyên liệu theo đợt
ly_nhua - 3000 cái - 2tr - 666 đồng /cái
ly_nhua - 3000 cái - 2tr - 666 đồng / cái
ong_hut - 1000 gram - 100k - 100 đồng / cái


Bảng inventories: Tồn kho

ly_nhua: 6000 cái - 666 đồng / cái - 4tr tổng
ong_hut: 1000 gram - 100 đồng /g - 100k tổng

Bảng products

Thêm bảng phụ: product_inventory_used (n - n): Thêm nguyên liệu vào sản phẩm
ví dụ:

Cà phê sữa (ID: 1)


Tính tương đối lợi nhuận theo tháng

Lợi nhuận = Doanh Thu - sum(expenses) - inventories

Tính lợi nhuận tổng

Lợi nhuận = Doanh Thu - sum(expenses) - inventories - Vốn ban đầu
