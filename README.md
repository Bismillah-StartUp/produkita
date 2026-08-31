# Produkita

Platform manajemen produk dan sertifikat. Frontend Next.js ini murni konsumen API — semua data dan logic bisnis ada di backend Go (`../backend`), tidak ada database atau ORM di sisi frontend.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) — framework React
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) — styling & komponen UI
- [Zustand](https://github.com/pmndrs/zustand) — state management
- [Recharts](https://recharts.org) — chart dashboard
- [React Email](https://react.email) — template email

## Struktur Proyek

```
app/           routes (App Router) + Route Handlers (app/api/**/route.ts) sebagai proxy ke backend Go
components/    komponen UI (components/ui = shadcn) & komponen per halaman
hooks/         "use client" hooks, bungkus fetch ke Route Handlers
lib/           helper server-only: client fetch ke backend Go per domain (lib/<domain>/api.ts), auth cookie/JWT, enums, utils
stores/        Zustand store
types/         tipe TypeScript bersama
```

### Alur data

Component → hook (`hooks/use*.ts`) → Route Handler (`app/api/**/route.ts`) → `lib/<domain>/api.ts` → backend Go.

Route Handler membaca JWT dari cookie (`lib/auth/token.ts`) dan meneruskannya sebagai `Authorization: Bearer` + `X-Api-Key` ke backend. Tidak ada Server Action (`"use server"`) yang dipakai — semua request lewat HTTP biasa supaya terlihat di DevTools.

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Environment

Salin `.env.example` ke `.env` dan isi konfigurasinya:

```bash
cp .env.example .env
```

| Variabel | Keterangan |
| --- | --- |
| `BACKEND_API_URL` | Base URL backend Go, mis. `http://localhost:3010/api` |
| `BACKEND_API_KEY` | API key yang sama dengan `API_KEY` di backend |
| `JWT_SECRET` | Harus sama persis dengan `JWT_SECRET` backend |
| `COOKIE_NAME`, `JWT_EXPIRES_IN`, `OTP_EXPIRED_MINUTES` | Harus konsisten dengan konfigurasi backend |

### 3. Development Server

Pastikan backend Go sudah jalan (lihat `../backend/README.md`), lalu:

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Menjalankan dengan Docker

```bash
cp .env.example .env
docker compose up --build
```

Service `app` (Next.js standalone build) jalan di [http://localhost:3000](http://localhost:3000). Pastikan `.env` mengarah ke backend Go yang sudah berjalan (`BACKEND_API_URL`).

## Menambah Komponen UI

```bash
pnpm exec shadcn@latest add button
```

Komponen ditempatkan di `components/ui`, lalu diimport seperti biasa:

```tsx
import { Button } from "@/components/ui/button"
```
