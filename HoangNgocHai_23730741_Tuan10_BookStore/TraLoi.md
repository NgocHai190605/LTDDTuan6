# Buổi 10 – Trả lời câu hỏi bổ sung
Phạm Quốc Khánh – 23641111

1. FlatList dựng cách xếp hàng theo số cột ngay từ đầu nên không cho đổi numColumns khi đang chạy. Đặt key={String(numColumns)} thì khi số cột đổi, key đổi, React huỷ FlatList cũ và dựng FlatList mới. Bỏ key thì bật Switch sẽ báo lỗi "Changing numColumns on the fly is not supported".

2. Dữ liệu chỉ một màn dùng và có thể mất khi rời màn để trong useState: keyword, category, isTile của Home. Dữ liệu nhiều màn cùng đọc/ghi đưa vào Redux: giỏ hàng (Chi tiết thêm, Giỏ hàng hiển thị, tab hiện badge) và danh sách yêu thích (Chi tiết bật/tắt, tab Yêu thích hiển thị).

3. Redux Toolkit dùng Immer. Reducer nhận một bản nháp (draft) của state; các lệnh push, += trên bản nháp được Immer ghi lại rồi tạo ra state mới, state cũ không bị sửa. Ở component thường không có Immer, sửa trực tiếp state thì tham chiếu không đổi nên React không biết để render lại.

4. useAppSelector chỉ nhận hàm dạng (state) => giá trị, nên selectIsFavorite(id) nhận id rồi trả về hàm đọc state để vừa đúng kiểu vừa giữ được tham số id. Chỉ lưu id thì thông tin sách (tên, giá, rating) luôn lấy từ một nguồn là mảng BOOKS, không bị trùng lặp hay lệch dữ liệu, state cũng nhỏ gọn.

5. Không còn tác dụng. Không có useCallback thì mỗi lần Home render, onSelect là một hàm mới; React.memo so sánh props thấy onSelect khác nên vẫn vẽ lại tất cả BookCard.
