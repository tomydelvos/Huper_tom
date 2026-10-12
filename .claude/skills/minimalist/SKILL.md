---
name: minimalist
description: Gaya frontend minimalis yang tenang dan mobile-first, diangkat dari frontend LukaCare (React + Vite + Tailwind CSS v4). Pakai saat membangun atau merapikan UI web — halaman, komponen, layout, design token, mode gelap — terutama bila pengguna minta tampilan "minimalis", "bersih", "tenang", "seperti LukaCare", atau saat memulai frontend baru dengan Tailwind v4.
---

# Minimalist — sistem frontend dari LukaCare

Skill ini merangkum keputusan desain yang sudah terbukti di frontend LukaCare dan membuatnya bisa dipakai ulang di proyek lain. Intinya: **sedikit warna, banyak ruang, satu aksen, satu momen gerak, komponen kecil yang dipakai ulang.**

File pendukung:
- `references/tokens.css` — token warna terang/gelap + pemetaan `@theme` Tailwind v4 + base layer + animasi. Salin ke `src/index.css`.
- `references/ui.jsx` — komponen dasar (`Button`, `ChoiceGroup`, `Field`, `Toggle`, `Sheet`, `Banner`, `Badge`, `PageHeader`, `SectionTitle`) dan `cx`.
- `references/layout.jsx` — `AppShell`: sidebar desktop, top bar + navigasi bawah mobile, mode fokus.

## Kapan dipakai

- Memulai frontend baru (React/Vite/Tailwind v4) dan butuh fondasi visual yang rapi.
- Merapikan UI yang ramai: terlalu banyak warna, shadow, border, ukuran font.
- Pengguna menyebut minimalis, bersih, tenang, "kayak LukaCare".

Tidak cocok untuk: landing page yang sengaja maksimalis, dashboard data padat (pakai skill dataviz untuk grafik).

## Alur kerja

1. **Tentukan identitas dalam 4 peran warna**, bukan palet bebas:
   - `canvas` — latar halaman, sedikit berwarna (bukan putih murni). LukaCare: `#f5f7f4` (kasa).
   - `primary` — satu warna aksi utama yang tenang. LukaCare: hijau pinus `#0e6b58`, sengaja *bukan* biru klinis.
   - `accent` — satu warna ciri khas, dipakai hemat (logo, hero, badge hitungan). LukaCare: warna plester `#e9be93`.
   - `alert` — merah **hanya** untuk bahaya/darurat/destruktif. Jangan untuk dekorasi.
   Lalu turunkan sisanya dari `references/tokens.css`: `surface`, `sunken`, `ink`, `ink-soft`, `muted`, `line`, varian `-strong`/`-soft`, `caution`, `success`.
2. **Salin `references/tokens.css`** ke `src/index.css`, ganti nilai hex di `:root` dan dua blok gelap. Prefix variabel (`--mx-*`) boleh diganti singkatan produk (LukaCare: `--lc-*`).
3. **Salin `references/ui.jsx`** ke `src/components/ui.jsx` dan `references/layout.jsx` ke `src/components/AppShell.jsx`. Ganti ikon/label nav. Butuh `react-icons` (set `lu`, Lucide).
4. **Bangun halaman** dengan pola di bawah. Cek ulang dengan checklist di akhir.

## Aturan inti

### Warna
- Selalu pakai kelas token (`bg-surface`, `text-muted`, `border-line`, `bg-primary-soft`). **Jangan hex literal di komponen** — mode gelap jadi rusak.
- Mode gelap ditulis dua kali: `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {…} }` dan `:root[data-theme="dark"] {…}`, supaya bisa ikut sistem *dan* dipaksa manual.
- Status pakai pasangan `X` + `X-soft`: latar soft, ikon/teks warna penuh. Contoh banner bahaya: `bg-alert-soft border-alert/30` + ikon `text-alert`, teks tetap `text-ink`.
- Bayangan nyaris tidak ada. Pisahkan permukaan dengan `border border-line` atau `ring-1 ring-line`. Shadow hanya untuk elemen melayang (sheet, toast, hero).

### Tipografi
- Satu keluarga font (LukaCare: Plus Jakarta Sans 400–800 dari Google Fonts). Hierarki dari **berat**, bukan banyak ukuran.
- Skala tetap: body `text-[15px]`, sekunder `text-sm text-muted`, badge `text-[13px]`, judul seksi `text-lg font-extrabold`, judul halaman `text-[1.75rem] sm:text-[2rem] font-extrabold`, hero `text-[2.15rem] sm:text-[3.25rem] leading-[1.05] tracking-[-0.035em]`.
- Judul: `line-height 1.2`, `letter-spacing -0.015em`, `text-wrap: balance`. Paragraf: `text-wrap: pretty`, lebar `max-w-md`/`max-w-xl`/`max-w-prose`.
- Angka (harga, hitungan, tanggal) pakai `.tabular`.

### Bentuk dan ruang
- Radius besar dan konsisten: tombol, chip, nav item, badge = `rounded-full`; input, banner = `rounded-2xl`; kartu/daftar = `rounded-[1.5rem]`; panel samping = `rounded-[1.75rem]`; hero = `rounded-[2.25rem] sm:rounded-[3rem]`.
- Ritme vertikal: antar seksi `space-y-10` / `mt-10`, judul seksi ke isi `mb-3`, dalam form `space-y-1.5` (label–input) dan `space-y-7` (antar field).
- Daftar = satu kartu dengan `divide-y divide-line`, bukan tumpukan kartu terpisah.
- Keadaan kosong = `border border-dashed border-line` + satu kalimat yang menjelaskan langkah berikutnya.

### Layout
- **Mobile-first.** Mobile: top bar sticky (`bg-canvas/90 backdrop-blur-md`) + navigasi bawah 4 item. Desktop (`lg:`): sidebar `w-64` dan nav bawah hilang.
- Konten: `mx-auto max-w-3xl lg:max-w-5xl px-4 sm:px-6 lg:px-10`, padding bawah mobile memberi ruang nav bawah + `env(safe-area-inset-bottom)`.
- Alur langkah demi langkah (wizard, checkout) pakai **mode fokus**: `AppShell focus` tanpa navigasi utama.
- Desktop dua kolom: `lg:grid-cols-[1.35fr_1fr]`, kolom kanan `self-start` untuk info pendukung.
- Satu aksi darurat/penting boleh selalu terlihat (LukaCare: tombol "Darurat" di top bar dan kartu di bawah sidebar).

### Gerak
- **Satu momen gerak khas** saja per produk (LukaCare: `plaster-stick`, plester "menempel" di hero). Sisanya fungsional dan cepat: fade 180ms, sheet 220ms, toast 200ms.
- Transisi tombol hanya warna/border/filter, `duration-150`. Tanpa scale/bounce pada hover.
- Semua animasi dimatikan di `prefers-reduced-motion: reduce`.

### Motif identitas
- Ciri visual (`.motif-wing` + `.motif-pad` + `.motif-stick` di `tokens.css`; LukaCare: tekstur plester) **hanya di hero dan logo**. Tempat lain tetap polos. Ilustrasi = SVG inline sederhana yang mewarnai diri dengan `var(--token)`, jadi ikut mode gelap.

### Komponen
- Pakai ulang `ui.jsx` sebelum membuat komponen baru. Varian tombol: `primary`, `secondary`, `soft`, `ghost`, `danger`, `danger-soft`, `danger-ghost`; ukuran `sm` 36px, `md` 44px, `lg` 52px.
- Pilihan tunggal = chip (`ChoiceGroup`, `role="radio"`), bukan `<select>`, bila opsinya ≤ 6.
- Dialog = `Sheet`: muncul dari bawah di mobile, di tengah di desktop, menjebak fokus, tutup dengan Escape, kembalikan fokus.
- Toast: satu baris, `bg-ink text-canvas`, di atas nav bawah, `aria-live="polite"`.
- Komponen tidak memanggil `fetch` langsung; data lewat `services/*`, state global lewat provider.

### Aksesibilitas
- Target sentuh minimal 44px (`h-11`, `min-h-11`, ikon `h-10 w-10`).
- Fokus terlihat global: `:focus-visible { outline: 3px solid var(--primary); outline-offset: 2px }`.
- `aria-current="page"` di nav aktif, `aria-label` di tombol ikon, ikon dekoratif `aria-hidden`, badge hitungan punya teks `sr-only`.
- Setiap `<section>` punya `aria-labelledby` ke judulnya.

### Copy
- Sentence case, kalimat aktif dan pendek. Tombol menyebut aksinya ("Simpan catatan", bukan "Submit").
- Pesan error: apa yang salah + cara memperbaiki. Keadaan kosong: apa yang bisa dilakukan selanjutnya.
- Untuk produk Indonesia: Bahasa Indonesia, sapaan "Anda".

## Pola halaman

```jsx
<div>
  <PageHeader title="Judul halaman" lead="Satu kalimat penjelas." action={<Button size="sm">Aksi</Button>} />
  <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
    <div className="space-y-10">
      <section aria-labelledby="s1">
        <SectionTitle id="s1" action={<Link className="text-sm font-semibold text-primary">Lihat semua</Link>}>Seksi</SectionTitle>
        <div className="divide-y divide-line rounded-[1.5rem] border border-line bg-surface px-4">{/* baris */}</div>
      </section>
    </div>
    <aside className="self-start rounded-[1.75rem] bg-surface p-5 ring-1 ring-line sm:p-6">{/* info pendukung */}</aside>
  </div>
</div>
```

## Checklist sebelum selesai

- [ ] Tidak ada hex literal di JSX; semua warna dari token. Cek mode gelap (`data-theme="dark"`).
- [ ] Hanya satu warna aksi utama; merah hanya untuk bahaya.
- [ ] Ciri visual/aksen hanya di hero, logo, dan badge hitungan.
- [ ] Tiap elemen interaktif ≥ 44px dan fokus keyboard terlihat.
- [ ] Animasi mati saat reduced motion.
- [ ] Tampil benar di lebar 360px tanpa scroll horizontal, dan di `lg:` dengan sidebar.
- [ ] Copy: sentence case, tombol berupa kata kerja, error menjelaskan cara memperbaiki.
