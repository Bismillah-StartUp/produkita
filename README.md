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

## Menjalankan dengan Docker

Pastikan Docker dan Docker Compose sudah terinstall, lalu salin `.env.example` ke `.env` dan isi konfigurasinya (minimal `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`).

```bash
cp .env.example .env
docker compose up --build
```

Service yang dijalankan:
- `app`: Next.js (standalone build) di [http://localhost:3000](http://localhost:3000)
- `db`: PostgreSQL, data tersimpan di volume `db_data`

Image production tidak menyertakan Prisma CLI (devDependency), jadi jalankan migrasi dari host setelah `db` siap, dengan `DATABASE_URL` mengarah ke `localhost:<DATABASE_PORT>`:

```bash
pnpm exec prisma migrate deploy
```

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
