import { load, save } from "../lib/storage";

// Data proyek masih mock di localStorage. Saat API siap, ganti isi fungsi
// di sini dengan fetch; komponen tidak perlu berubah.

export const KINDS = [
  { id: "desain", label: "Desain" },
  { id: "pengembangan", label: "Pengembangan" },
  { id: "riset", label: "Riset" },
  { id: "pemasaran", label: "Pemasaran" },
];

export const PRIORITIES = [
  { id: "rendah", label: "Rendah" },
  { id: "sedang", label: "Sedang" },
  { id: "tinggi", label: "Tinggi" },
];

const KEY = "projects";

export async function listProjects() {
  return load(KEY, []);
}

export async function saveProjects(projects) {
  save(KEY, projects);
  return projects;
}

export function sampleProjects() {
  const day = 86400000;
  return [
    { id: "p1", name: "Riset pengguna kuartal 4", kind: "riset", priority: "tinggi", note: "Wawancara 8 pelanggan aktif.", status: "aktif", createdAt: new Date(Date.now() - 6 * day).toISOString() },
    { id: "p2", name: "Halaman harga baru", kind: "desain", priority: "sedang", note: "", status: "aktif", createdAt: new Date(Date.now() - 2 * day).toISOString() },
    { id: "p3", name: "Migrasi ke Tailwind v4", kind: "pengembangan", priority: "rendah", note: "", status: "selesai", createdAt: new Date(Date.now() - 20 * day).toISOString() },
  ];
}
