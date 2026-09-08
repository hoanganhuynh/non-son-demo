# Nón Sơn — Homepage demo

Trang chủ dựng 1:1 từ file Figma *Nón Sơn · Home v2* (node `18:10895`),
khung gốc 1600px, scale theo bề rộng cửa sổ bằng CSS `zoom`.

## Nội dung

- `index.html` — toàn bộ trang (HTML + CSS + JS trong một file)
- `img-v4/` — asset xuất trực tiếp từ Figma (ảnh sản phẩm, ảnh bài viết, logo, icon SVG)

## Đặc điểm

- **Scroll dạng stacking** — 9 nhóm section, nhóm sau trượt từ dưới lên phủ nhóm trước
- **Bảng màu tâm trạng** — 4 gam bấm được, panel đổi màu/ảnh/thông tin sản phẩm
- **Hover** — card có shadow + zoom ảnh + CTA "Thêm vào giỏ"; nút và link đều có trạng thái
- **Giỏ hàng** — bấm "Thêm vào giỏ" cộng 1 vào badge trên header (mỗi nút một lần)
- Nút về đầu trang ở footer

## Chạy local

```bash
python3 -m http.server 8788
```

Mở http://localhost:8788

## Deploy

Trang tĩnh thuần, không cần build. Vercel nhận `index.html` ở thư mục gốc.
