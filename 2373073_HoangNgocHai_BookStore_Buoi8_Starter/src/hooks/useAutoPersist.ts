import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// HOOK CHUNG: mỗi khi `value` đổi (và đã nạp xong dữ liệu cũ) → tự ghi vào AsyncStorage.
// Dùng cho cart, wishlist… — không phải viết lại effect ở từng nơi.
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  // BT8.7b: chỉ ghi khi ready = true. Nếu ghi sớm, giá trị khởi tạo (rỗng) sẽ đè lên dữ liệu đã lưu
  // trước khi hàm đọc kịp trả kết quả.
  useEffect(() => {
    if (ready) saveJSON(key, value);
  }, [key, value, ready]);
}
