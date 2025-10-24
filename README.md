# Mommy-Leveling
Tagline: Mom climbs the tower – Baby grows up. 
A platform that "gamifies" the journey of motherhood, where each action of taking care of the baby helps mothers "level up" themselves, unlock skills, knowledge, and connect the mother-baby community.

## 🚀 Hướng dẫn chạy website / Getting Started

### Yêu cầu hệ thống / Prerequisites
- **Node.js** phiên bản 18.0 trở lên / Node.js 18.0 or higher
- **pnpm** (khuyến nghị) hoặc npm / pnpm (recommended) or npm
- **Git** để clone repository

### 📥 Cài đặt / Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/hannehere/Mommy-Leveling.git
   cd Mommy-Leveling
   ```

2. **Cài đặt dependencies**
   ```bash
   # Sử dụng npm với legacy peer deps (khuyến nghị cho React 19)
   npm install --legacy-peer-deps
   
   # Hoặc sử dụng pnpm (tự động xử lý conflicts)
   pnpm install
   ```

3. **Chạy development server**
   ```bash
   # Với npm
   npm run dev
   
   # Với pnpm
   pnpm dev
   ```

4. **Mở trình duyệt và truy cập:**
   ```
   http://localhost:3000
   ```

### 🌐 Các lệnh có sẵn / Available Scripts

```bash
# Chạy development server
pnpm dev          # Chạy ở chế độ development

# Build production
pnpm build        # Tạo build cho production
pnpm start        # Chạy production server

# Kiểm tra code
pnpm lint         # Kiểm tra linting
pnpm type-check   # Kiểm tra TypeScript types
```

### 🛠 Công nghệ sử dụng / Tech Stack

- **Framework:** Next.js 16.0.0 với React 19.2.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4.1.9
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Fonts:** Be Vietnam Pro (hỗ trợ tiếng Việt)
- **AI Features:** 
  - Emotional Translation System (English ↔ Vietnamese)
  - AI Tone Filter System (5 emotional modes)

### 🌟 Tính năng đặc biệt / Special Features

- **🤖 AI Emotional Translator**: Dịch thuật thông minh giữ nguyên cảm xúc
- **💕 AI Tone Filter**: Lọc ngôn ngữ để tạo cảm giác ấm áp, hỗ trợ
- **🌍 Bilingual Support**: Hỗ trợ đầy đủ tiếng Anh và tiếng Việt
- **📱 Responsive Design**: Tương thích mọi thiết bị
- **🎨 Emotional UI**: Giao diện được thiết kế để mang lại cảm giác ấm áp

### 🔧 Development Mode

Khi chạy ở chế độ development, bạn sẽ có thêm:
- **Emotional UX Testing Tools**: Công cụ kiểm tra độ "ấm áp" của văn bản
- **Tone Customization Interface**: Giao diện tùy chỉnh tone cảm xúc
- **Real-time Hot Reload**: Tự động reload khi có thay đổi code

### 🚨 Troubleshooting

**Lỗi ERESOLVE dependency conflict (React 19 vs older packages):**
```bash
# Giải pháp 1: Sử dụng legacy peer deps
npm install --legacy-peer-deps

# Giải pháp 2: Sử dụng pnpm thay vì npm
npm install -g pnpm
pnpm install

# Giải pháp 3: Force install (không khuyến nghị)
npm install --force
```

**Lỗi Parsing CSS source code failed:**
```bash
# Xóa cache và restart
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

**Lỗi JSX Parsing với Turbopack:**
```bash
# Nếu gặp lỗi "Expected '>', got 'value'" - xóa .next và restart
Remove-Item -Recurse -Force .next
npm run dev
```

**Lỗi UI/UX tràn viền (Overflow Issues):**
```bash
# Các lỗi responsive đã được sửa với:
# - Thêm overflow-x-hidden cho body và containers
# - Responsive breakpoints cho mobile/tablet/desktop
# - Max-width controls để tránh tràn viền
# - Flexible grid layouts
```

**Lỗi port đã được sử dụng:**
```bash
# Thay đổi port khác
npm run dev -- -p 3001
# hoặc
pnpm dev -- -p 3001
```

**Lỗi dependency khác:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Hoặc với pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Lỗi TypeScript:**
```bash
# Kiểm tra types
npm run type-check
# hoặc
pnpm type-check
```

**Lỗi build:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Hoặc với pnpm
rm -rf .next
pnpm build
```

### 📖 Tài liệu thêm / Additional Documentation

- [AI Tone Filter System](./AI-TONE-FILTER-SYSTEM.md) - Hệ thống lọc cảm xúc AI
- [Emotional Translation Guide](./docs/emotional-translation.md) - Hướng dẫn dịch thuật cảm xúc
- [Component Library](./docs/components.md) - Thư viện component UI

---

💕 **Chúc bạn có trải nghiệm tuyệt vời với Mommy Leveling!**
