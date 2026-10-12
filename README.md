# Delvos

Frontend Delvos: React 19 + Vite 7 + Tailwind CSS v4, dibangun dengan skill `minimalist` (`.claude/skills/minimalist`).

```bash
cd apps/web
npm install
npm run dev      # http://localhost:3001
npm run build    # output ke apps/web/dist
```

| Rute | Isi |
| --- | --- |
| `/` | Beranda: hero, proyek berjalan, tips |
| `/proyek`, `/proyek/:id` | Daftar proyek dengan saringan, detail (catatan, tandai selesai, hapus) |
| `/mulai` | Buat proyek, 3 langkah, mode fokus tanpa navigasi |
| `/komponen` | Etalase token warna dan semua komponen dasar |
| `/akun` | Tema (sistem/terang/gelap), unduh dan hapus data |

Data masih mock di `localStorage` (prefix `delvos:`) lewat `src/services/projectService.js`.
