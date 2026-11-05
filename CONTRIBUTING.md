# Hướng Dẫn Đóng Góp (Contributing Guidelines)

Cảm ơn bạn đã quan tâm đến dự án **Kỷ Niệm 70 Năm Khoa Toán – Cơ – Tin Học (1956 – 2026)**!
Mọi đóng góp từ cựu sinh viên, cán bộ, sinh viên và cộng đồng nhằm hoàn thiện tư liệu cũng như tối ưu trang web đều rất quý giá.

---

## 1. Đóng Góp Ảnh Tư Liệu & Hiệu Đính Lịch Sử

Nếu bạn có thêm ảnh tư liệu, hồi ức hoặc phát hiện thông tin mốc thời gian cần đính chính:
- **Cách đơn giản nhất:** Tạo một [GitHub Issue](https://github.com/tquang39/70th-anniversary-album/issues) với tiêu đề `[Tư liệu] Tên sự kiện / ảnh` kèm theo ảnh scan và thông tin nguồn gốc.
- **Nếu bạn muốn gửi qua Pull Request:**
  1. Thêm ảnh chất lượng tốt vào thư mục phù hợp trong `public/assets/album/`.
  2. Bổ sung thông tin mô tả vào file `src/data/photos.ts` hoặc `src/data/timeline.ts`.
  3. Đảm bảo ảnh có ghi chú rõ ràng về năm chụp, nhân vật hoặc sự kiện.

---

## 2. Đóng Góp Kỹ Thuật (Code & Giao Diện)

### Quy trình phát triển:
1. **Fork** repository này về tài khoản GitHub của bạn.
2. Tạo một branch mới cho tính năng hoặc bản sửa lỗi:
   ```bash
   git checkout -b feature/ten-tinh-nang
   # hoặc
   git checkout -b fix/ten-loi
   ```
3. Cài đặt thư viện và kiểm tra trước khi commit:
   ```bash
   npm install
   npm run dev
   ```
4. Đảm bảo bản build không phát sinh lỗi TypeScript hoặc cú pháp:
   ```bash
   npm run build
   ```
5. Commit thay đổi với thông điệp rõ ràng và mở Pull Request (PR) về nhánh `main`.

---

## 3. Quy Ước Thiết Kế & Mã Nguồn

- Giữ vững phong cách thiết kế kỷ yếu trang trọng, hoài niệm trên gam màu giấy ngà (`#F6F2E9`) và đỏ son (`#7C2D2D`).
- Đảm bảo tính tương thích responsive trên các màn hình di động, máy tính bảng và desktop.
- Tuân thủ khả năng trợ năng (accessibility): hỗ trợ phím tắt và chế độ giảm chuyển động (`prefers-reduced-motion`).
- Không thêm các thư viện bên ngoài quá nặng khi chưa thực sự cần thiết để đảm bảo tốc độ tải trang nhanh nhất.
