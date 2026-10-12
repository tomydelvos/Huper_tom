# Delvos — konteks untuk Claude Code

Frontend ada di `apps/web` (lihat README untuk perintah dan rute). Belum ada linter, test, maupun backend.

- **Gaya**: ikuti skill `minimalist` (`.claude/skills/minimalist/SKILL.md`). Token warna di `src/index.css` (`--dv-*`, kelas `bg-primary`, `text-muted`, `bg-accent-soft`, …). Jangan hex literal di JSX.
- **Komponen**: pakai ulang `src/components/ui.jsx` dan `AppShell.jsx` sebelum membuat yang baru.
- **Data**: komponen tidak memanggil `fetch`; lewat `src/services/*`, state global di `src/store/AppProviders.jsx` (`useProjects`, `useToast`, `useTheme`).
- **Router**: modul kecil di `src/lib/router.jsx` (API mirip react-router).
- **Copy**: Bahasa Indonesia, sapaan "Anda", sentence case, tombol berupa kata kerja.
