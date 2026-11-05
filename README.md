# Kỷ Niệm 70 Năm Khoa Toán – Cơ – Tin Học (1956 – 2026)
### Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội
*(Tiền thân: Đại học Tổng hợp Hà Nội)*

Trang web kỷ yếu trực tuyến ghi lại những cột mốc lịch sử, hình ảnh tư liệu và kỷ niệm qua 70 năm xây dựng và phát triển của Khoa Toán – Cơ – Tin học (1956 – 2026).

---

## 📖 Giới Thiệu Về Trang Web & Các Tính Năng Chính

Trang web được xây dựng nhằm mang lại trải nghiệm xem kỷ yếu trực quan, kết nối các thế hệ cán bộ, giảng viên và sinh viên:

### 1. Khối Ảnh 3D Tương Tác
- Hiển thị 59 bức ảnh tư liệu lịch sử trên không gian 3D.
- Hỗ trợ 3 chế độ góc nhìn chuyển đổi linh hoạt:
  - **Khối cầu:** Các bức ảnh phân bố đều quanh khối cầu Fibonacci.
  - **Xoắn ốc thời gian:** Dải ảnh uốn lượn theo trục dọc tượng trưng cho dòng chảy lịch sử.
  - **Vành đai quỹ đạo:** Các ảnh xếp thành các vòng đĩa xoay nghiêng.
- Người xem có thể kéo xoay tự do, rê chuột để xem nổi bật từng ảnh kèm chú thích, hoặc bấm nút chọn ngẫu nhiên một bức ảnh kỷ niệm.

### 2. Biên Niên Sử 1956 – 2026 (Dòng Thời Gian)
- Bố cục cuộn dọc chia thành 5 chương lịch sử tiêu biểu cùng các tư liệu và hình ảnh đi kèm.
- **Đồng hồ số năm bám dính (sticky):** Khi cuộn trang, số năm và công thức toán học đại diện cho từng thời kỳ sẽ tự động cập nhật theo chương đang đọc.
- **Thanh chọn nhanh mốc thời gian:** Cho phép bấm chọn để di chuyển nhanh đến từng giai đoạn cụ thể.

### 3. Bản Phác Họa Cổng Trường 19 Lê Thánh Tông
- Sử dụng bản vẽ phác họa nét mực kiến trúc của Tòa nhà Đại học Tổng hợp lịch sử (19 Lê Thánh Tông).
- Được lồng làm hình nền chìm nghệ thuật trong các phần nội dung, tạo cảm giác trang trọng và hoài niệm.

### 4. Thanh Kéo So Sánh "Xưa & Nay" (Before / After Slider)
- Công cụ so sánh trực quan giữa ảnh tư liệu lịch sử và hình ảnh ngày nay (`1956 ⇄ 2026`).
- Bao gồm 3 cặp ảnh theo các chủ đề: Dấu ấn thành lập & kỷ niệm, Giảng đường & công nghệ qua thời gian, và các thế hệ Thầy – Trò.
- Người dùng có thể kéo thanh trượt sang hai bên để đối chiếu chi tiết.

### 5. Bàn Viết Thiệp Lưu Bút & Dấu Triện Kỷ Niệm
- Nơi các thế hệ cựu sinh viên, thầy cô và khách truy cập có thể gửi lời chúc, nhắn nhủ tới Khoa.
- Khi gửi, hệ thống hiển thị hoạt ảnh đóng dấu triện đỏ kỷ niệm 70 năm và lưu thiệp trực tiếp trên trình duyệt (`localStorage`) hiển thị ở Bức tường Lưu bút.

### 6. Thư Viện Album Tư Liệu & Xem Ảnh Phóng To
- Bộ sưu tập ảnh được phân loại theo từng nhóm chủ đề: Thầy trò qua các thời kỳ, Giai đoạn sơ tán kháng chiến, NCKH & Hợp tác quốc tế, Sinh viên & phong trào.
- Khung xem ảnh phóng to (Lightbox) dạng ảnh in kèm chú thích rõ ràng, hỗ trợ đóng nhanh bằng phím `Escape`.

---

## 🎨 Giao Diện & Trải Nghiệm

- **Tone màu chủ đạo:** Phong cách kỷ yếu truyền thống với nền giấy ngà, sắc đỏ son và viền đồng cổ.
- **Đáp ứng tốt mọi kích thước:** Hiển thị mượt mà trên máy tính để bàn, máy tính bảng và điện thoại di động.
- **Trợ năng:** Tự động tối ưu hoặc tắt các hoạt ảnh phức tạp khi người dùng kích hoạt tùy chọn giảm chuyển động (`prefers-reduced-motion`) trên hệ thống.

---

## 💻 Công Nghệ Sử Dụng

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Đồ họa 3D:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Hoạt ảnh & Cuộn trang:** [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/scrolltrigger/)
- **Biểu tượng:** [Lucide React](https://lucide.dev/)
- **Styling:** CSS chuẩn với hệ thống biến tùy biến (CSS Variables), không dùng thư viện UI nặng.

---

## 📁 Cấu Trúc Thư Mục

```
70th-anniversary-album/
├── public/
│   ├── assets/
│   │   ├── album/                  # Ảnh tư liệu theo các chuyên mục
│   │   ├── sphere/                 # 59 ảnh cho khối 3D Photo Sphere
│   │   ├── dh-tong-hop-sketch.jpg  # Bản phác họa cổng trường 19 Lê Thánh Tông
│   │   └── bg-university.webp      # Ảnh phối cảnh trường
├── src/
│   ├── components/                 # Các thành phần giao diện (Header, 3D Sphere, Lightbox, ...)
│   ├── data/                       # Dữ liệu ảnh, mốc thời gian và danh mục
│   ├── lib/                        # Thiết lập cấu hình GSAP
│   ├── sections/                   # Các khối nội dung chính của trang web
│   ├── styles/                     # CSS biến tokens, bố cục và hoạt ảnh
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

---

## 🚀 Hướng Dẫn Chạy Dự Án

### Yêu cầu
- Node.js 20.19+ hoặc 22.12+
- npm (hoặc pnpm / yarn)

### Cài đặt và khởi chạy

1. **Clone mã nguồn:**
   ```bash
   git clone https://github.com/tquang39/70th-anniversary-album.git
   cd 70th-anniversary-album
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Chạy ở chế độ phát triển:**
   ```bash
   npm run dev
   ```
   Mở địa chỉ hiển thị trong terminal (mặc định: `http://localhost:5173`).

4. **Đóng gói bản chạy thực tế (Build):**
   ```bash
   npm run build
   npm run preview
   ```
   Bản build tĩnh được tạo trong thư mục `dist/`, sẵn sàng triển khai trên GitHub Pages, Vercel, Netlify,...

---

## 📝 Ghi Chú & Bản Quyền

- Đây là dự án cá nhân được xây dựng nhân dịp kỷ niệm 70 năm thành lập Khoa Toán – Cơ – Tin học (1956 – 2026).
- Các hình ảnh, tư liệu lịch sử và thông tin được sưu tầm, tổng hợp từ các nguồn tư liệu lưu trữ của Khoa, Nhà trường và các thế hệ thầy trò. Bản quyền tư liệu hình ảnh thuộc về các tác giả và đơn vị sở hữu gốc.
