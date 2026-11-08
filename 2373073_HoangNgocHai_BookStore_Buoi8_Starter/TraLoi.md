# Trả lời câu hỏi bổ sung — Buổi 8

## 1. Cờ `ready`
Lần render đầu tiên, store còn ở trạng thái khởi tạo (giỏ hàng `[]`), còn dữ liệu cũ vẫn nằm trong AsyncStorage và đang được đọc bất đồng bộ.
Nếu `useAutoPersist` bỏ điều kiện `ready`, effect chạy ngay sau render đầu và `saveJSON(key, [])` ghi mảng rỗng đè lên giỏ đã lưu, trước khi `loadJSON` kịp trả kết quả.
Khi đọc xong thì dữ liệu cũ đã mất, `hydrateCart` chỉ nạp được mảng rỗng, giỏ luôn trống sau mỗi lần mở app.
Cờ `ready` chỉ bật sau khi đọc xong nên chặn được lần ghi sớm đó.

## 2. Token giả
Hai điểm không an toàn:
1. Mật khẩu nằm sẵn trong `db.json` (dạng thô, không băm) và được app tải về để so sánh. Ai mở được API là thấy mật khẩu của mọi người dùng.
2. Token do app tự tạo (`token-<id>-<time>`) có định dạng đoán được, không có chữ ký và hạn dùng, nên ai cũng làm giả được.

Hệ thống thật để **server** kiểm tra mật khẩu (đã băm bằng bcrypt/argon2) rồi cấp token có thời hạn (JWT hoặc session). App lưu token bằng **SecureStore** (Keychain trên iOS, Keystore trên Android) thay vì AsyncStorage dạng thô.

## 3. Hai effect trong `CartItemRow`
Nếu xóa effect đồng bộ `setQty(item.quantity)`, `qty` cục bộ chỉ lấy giá trị `item.quantity` ở lần render đầu, nên số trên nút lệch store khi store đổi từ nơi khác:
- Mở app, giỏ được nạp từ AsyncStorage (`hydrateCart`) sau khi dòng đã render với số lượng cũ.
- Xóa sản phẩm rồi thêm lại cùng sách, hoặc thêm cùng sách từ trang Chi tiết (store tăng số lượng nhưng state cục bộ vẫn giữ số cũ).
- Store tự "kẹp" số lượng theo tồn kho (`clamp`) làm kết quả khác với số người dùng bấm.

## 4. Một nguồn state
Nếu mỗi nơi giữ `useState` riêng, tim ở lưới và ở trang Chi tiết là hai biến độc lập: bấm tim ở lưới rồi mở sách đó, trang Chi tiết vẫn hiện tim trắng (và ngược lại). Thoát màn hình hoặc tải lại là mất, vì chỉ lưu trong component.
Với store wishlist, mọi `HeartButton` đọc cùng một danh sách `ids` và gọi cùng `toggle`, nên luôn khớp nhau. Danh sách này cũng là thứ duy nhất được lưu vào AsyncStorage, và màn Yêu thích chỉ lọc theo `ids`.

## 5. Code bổ sung: hiện/ẩn mật khẩu
Đã làm trong `src/screens/LoginScreen.tsx`:
```tsx
const [showPassword, setShowPassword] = useState(false);

<FormField ... secureTextEntry={!showPassword} style={{ paddingRight: 44 }} />
<Pressable style={styles.eye} onPress={() => setShowPassword((v) => !v)}>
  <Text style={{ opacity: showPassword ? 1 : 0.5 }}>👁</Text>
</Pressable>
```
(Ảnh chụp màn hình: chạy app rồi tự chụp màn Đăng nhập khi bấm 👁.)
