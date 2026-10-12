# Kỷ niệm 70 năm — Hành trình tri thức

Website tĩnh kể câu chuyện 70 năm Khoa Toán – Cơ – Tin học, với quả cầu ảnh 3D, dòng thời gian và album tư liệu.

## Yêu cầu
- Node.js 20.19+ hoặc 22.12+
- npm

## Chạy dự án
```bash
npm install
npm run dev
```
Mở URL Vite in ra trong terminal.

## Build bản tĩnh
```bash
npm run build
npm run preview
```
Bản build nằm trong thư mục `dist/` (cấu hình `base: "./"` cho GitHub Pages / Cloudflare Pages).

## Cấu trúc
```
src/
├── components/        # UI components tái sử dụng
│   ├── Header.tsx
│   ├── PhotoSphere.tsx
│   ├── SectionHeading.tsx
│   ├── PhotoCard.tsx
│   ├── PhotoImage.tsx
│   └── PhotoLightbox.tsx
├── sections/          # Các section lớn của landing page
│   ├── HeroSection.tsx
│   ├── StorySection.tsx
│   ├── TimelineSection.tsx
│   ├── AlbumSection.tsx
│   ├── FutureSection.tsx
│   └── FooterSection.tsx
├── data/              # Dữ liệu tách biệt
│   ├── navigation.ts
│   ├── photos.ts
│   ├── timeline.ts
│   └── notices.ts
├── types/             # TypeScript types
│   └── index.ts
├── hooks/             # Custom hooks
│   ├── useActiveSection.ts
│   ├── useBodyScrollLock.ts
│   ├── useEscapeKey.ts
│   ├── usePrefersReducedMotion.ts
│   └── useScrollReveal.ts
├── styles/
│   └── global.css
├── App.tsx
└── main.tsx

public/
└── assets/
    ├── photos/        # Ảnh gốc (tối ưu)
    ├── thumbnails/    # Thumbnail cho quả cầu/album
    └── logos/         # Logo trường/khoa (sẽ bổ sung)
```

## Thêm ảnh
1. Đặt ảnh gốc trong `public/assets/photos/` và thumbnail trong `public/assets/thumbnails/`.
2. Sửa `src/data/photos.ts` và `src/data/timeline.ts` để trỏ đến file mới.
3. Dùng ảnh có quyền sử dụng và ghi nguồn tư liệu chính xác.

## Tính năng chính
- **Header & Navigation**: Sticky header, menu mobile hoạt động, highlight mục đang xem.
- **Hero**: Tiêu đề lớn, CTA, quả cầu 3D placeholder với OrbitControls (xoay, zoom, auto-rotate).
- **Câu chuyện**: Typography cinematic, link điều hướng chức năng.
- **Dòng thời gian**: Dữ liệu từ `data/timeline.ts`, có khung ảnh placeholder cho từng mốc.
- **Album**: Lưới responsive, lightbox có đóng bằng nút/click ngoài/Escape, fallback ảnh đẹp khi chưa có file.
- **Tương lai**: Thiết kế cảm xúc, hiệu ứng CSS nhẹ, link quay lại timeline/album.
- **Footer**: Brand, thông điệp, slot logo trường/khoa, link về đầu trang.

## Khả năng truy cập & hiệu năng
- Semantic HTML, heading hierarchy, skip link, ARIA labels.
- `prefers-reduced-motion` được tôn trọng toàn cục (tắt auto-rotate, animation, smooth scroll).
- Lazy-load ảnh, `decoding="async"`, fallback khi ảnh lỗi.
- Three.js chỉ load trong Hero, OrbitControls có damping, touch-action `pan-y` để không chặn cuộn trang trên mobile.
- TypeScript strict, `verbatimModuleSyntax`, no unused locals/params.

## Ghi chú
- Toàn bộ nội dung lịch sử, năm tháng, mô tả ảnh hiện là **dữ liệu mẫu** (đã ghi chú rõ ràng trong UI và data). Cần đối chiếu với tư liệu chính thức của khoa trước khi công bố.
- Quả cầu ảnh (`PhotoSphere`) dùng placeholder geometry; kiến trúc sẵn sàng thay bằng ảnh thật ở giai đoạn sau.
- Build sản sinh `dist/` với chunk tách Three.js (`three-vendor`) giúp cache tốt hơn.