# Produkita

Platform manajemen produk dan sertifikat terintegrasi dengan Next.js dan Prisma.

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment

Salin file `.env.example` ke `.env.local` dan isi konfigurasi yang diperlukan:

```bash
cp .env.example .env.local
```

### 3. Database Migration

```bash
pnpm exec prisma migrate dev
```

Jalankan seed database (jika tersedia):

```bash
pnpm exec prisma db seed
```

### 4. Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Adding Components

Untuk menambah komponen UI, jalankan:

```bash
pnpm exec shadcn@latest add button
```

Komponen akan ditempatkan di folder `components/ui`.

## Using Components

Import komponen seperti berikut:

```tsx
import { Button } from "@/components/ui/button";
```
