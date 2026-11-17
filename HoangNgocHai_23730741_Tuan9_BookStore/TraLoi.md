# Buổi 9 — Trả lời câu hỏi bổ sung

**Họ tên:** Hoàng Ngọc Hải · **MSSV:** 23730741

**Thử thách:** đã làm **BT9.C1 – Mua lại** (nút "Mua lại" trong đơn Hoàn tất). Không còn phần nào dở.

## 1. Giá trị dẫn xuất

`errors` và `valid` là kết quả suy ra từ `name`, `phone`, `address` và số sản phẩm trong giỏ, nên tính lại ở mỗi lần render thì luôn khớp với dữ liệu đang có. Nếu lưu bằng `useState` riêng, mỗi chỗ `setName`, `setPhone`, `setAddress` (và cả khi giỏ đổi) đều phải nhớ cập nhật lại lỗi; quên một chỗ là lỗi hiện sai hoặc nút "Xác nhận đặt hàng" sáng/mờ sai. Ngoài ra `setState` cho lỗi gây thêm một lần render thừa.

## 2. Thứ tự gọi

Nếu `clear()` chạy trước `await createOrder(...)` thì khi mất mạng giỏ đã bị xoá (và `useAutoPersist` ghi luôn giỏ rỗng vào AsyncStorage) trong khi đơn chưa được tạo: người dùng mất hết sách đã chọn và phải chọn lại. Đặt `clear()` ngay sau `await createOrder(...)` thì chỉ khi server đã nhận đơn mới xoá giỏ; nếu lỗi, code nhảy vào `catch`, giỏ còn nguyên để bấm thử lại.

## 3. PUT hay PATCH

`PUT /users/1` thay **cả** bản ghi bằng nội dung gửi lên, nên user đó chỉ còn `{ id, name, phone }`: mất `email` và `password`, lần sau không đăng nhập được. `PATCH` chỉ đổi những trường được gửi, các trường khác giữ nguyên, nên phù hợp với form chỉ sửa một phần hồ sơ (tên + SĐT).

## 4. Cập nhật lạc quan

Nếu bỏ đoạn hoàn lại `read: false` trong `catch`, khi mất mạng giao diện vẫn báo "đã đọc" nhưng server vẫn là chưa đọc; mở lại màn Thông báo thì nó lại hiện chưa đọc, người dùng thấy khó hiểu. Nên dùng cách này cho thao tác nhẹ, ít khi lỗi và sai cũng không hại gì, ví dụ **thả tim / yêu thích**. Không nên dùng cho **đặt hàng / thanh toán**: phải chờ server xác nhận mới báo thành công, nếu báo trước rồi lỗi thì người dùng tưởng đã đặt mà thật ra chưa.

## 5. Code bổ sung — lọc trạng thái ở màn Đơn hàng

Thêm một state và sửa dữ liệu truyền cho `FlatList` trong `OrdersScreen.tsx`:

```tsx
type StatusFilter = "all" | OrderStatus;
const [status, setStatus] = useState<StatusFilter>("all");

const visibleOrders = useMemo(
  () => orders.filter((o) => status === "all" || o.status === status),
  [orders, status],
);

// <FlatList data={visibleOrders} … />
```

Phía trên danh sách có hàng nút **Tất cả / Chờ xác nhận / Đang giao / Hoàn tất / Đã huỷ** (giống CategoryChips), nút đang chọn nền indigo. Ảnh kết quả: xem báo cáo.
