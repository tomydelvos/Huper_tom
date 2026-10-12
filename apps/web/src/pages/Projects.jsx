import { useState } from "react";
import { Button, PageHeader } from "../components/ui";
import { ProjectRow } from "../components/ProjectRow";
import { sampleProjects } from "../services/projectService";
import { useProjects, useToast } from "../store/AppProviders";
import { cx } from "../lib/cx";

const FILTERS = [
  { id: "aktif", label: "Berjalan" },
  { id: "selesai", label: "Selesai" },
  { id: "semua", label: "Semua" },
];

export default function Projects() {
  const { projects, replaceAll } = useProjects();
  const toast = useToast();
  const [filter, setFilter] = useState("aktif");
  const shown = filter === "semua" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      <PageHeader
        title="Proyek"
        lead="Semua yang sedang dan sudah Anda kerjakan."
        action={
          <Button to="/mulai" size="sm">
            Proyek baru
          </Button>
        }
      />

      <div className="mb-4 flex gap-2" role="group" aria-label="Saring proyek">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cx(
              "min-h-11 rounded-full border px-4 text-[15px] font-medium transition-colors",
              filter === f.id ? "border-primary bg-primary text-on-primary" : "border-line bg-surface text-ink hover:border-muted"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length ? (
        <div className="divide-y divide-line rounded-[1.5rem] border border-line bg-surface px-4">
          {shown.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-line px-5 py-6">
          <p className="text-[15px] text-ink-soft">
            {projects.length ? "Tidak ada proyek di kategori ini. Coba saringan lain." : "Belum ada proyek. Buat yang pertama, atau isi dengan data contoh untuk melihat tampilannya."}
          </p>
          {!projects.length && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button to="/mulai">Buat proyek</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  replaceAll(sampleProjects());
                  toast("Data contoh ditambahkan");
                }}
              >
                Lihat dengan data contoh
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
