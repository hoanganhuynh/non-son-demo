# Nón Sơn — Homepage demo

Trang chủ dựng 1:1 từ file Figma *Nón Sơn · Home v2* (node `18:10895`),
khung gốc 1600px, scale theo bề rộng cửa sổ bằng CSS `zoom`.

## Nội dung

- `index.html` — trang chủ
- `pdp-v4.html` — trang chi tiết sản phẩm, chạy theo `?p=<id>`
- `img-v4/`, `img-pdp/` — asset xuất trực tiếp từ Figma

## Đặc điểm

- **Scroll dạng stacking** — 9 nhóm section, nhóm sau trượt từ dưới lên phủ nhóm trước
- **Bảng màu tâm trạng** — 4 gam bấm được, panel đổi màu/ảnh/thông tin sản phẩm
- **Hover** — card có shadow + zoom ảnh + CTA "Thêm vào giỏ"; nút và link đều có trạng thái
- **Giỏ hàng** — bấm "Thêm vào giỏ" cộng 1 vào badge trên header (mỗi nút một lần)
- Nút về đầu trang ở footer
- **Animation tiêu đề** — hiệu ứng `short-slide-right` (spec: [pixel-point/animate-text](https://github.com/pixel-point/animate-text)), chạy bằng Web Animations API, không thêm thư viện
- **Sticky header** nền sáng khi cuộn qua hero
- **Responsive** — canvas 1:1 từ 1201px trở lên; từ 1200px xuống layout co giãn thật (mốc 1200 · 1024 · 768 · 480)

## Chạy local

```bash
python3 -m http.server 8788
```

Mở http://localhost:8788

## Deploy

Trang tĩnh thuần, không cần build. Vercel nhận `index.html` ở thư mục gốc.

## Trang chi tiết sản phẩm

Dựng 1:1 từ Figma node `20:13983` (khung gốc **1920px**, khác trang chủ 1600px).
Trang chạy theo `?p=<id>` — bấm sản phẩm nào ở trang chủ thì mở đúng PDP của
sản phẩm đó. Danh mục nằm trong `window.NS_PRODUCTS`:

`da-cuu` · `sonmai-hoanggia` · `raffia-sun` · `classic` · `phot-heritage`
· `classic-trang` · `classic-xanhden` · `hoa-tiet`

Figma chỉ mô tả *Nón Phớt Da Cừu Heritage*; nội dung các sản phẩm còn lại được
soạn dựa trên thông tin ở trang chủ. Các mục chính sách cửa hàng (kích thước,
bảo hành, giao nhận) giữ nguyên cho mọi sản phẩm.
