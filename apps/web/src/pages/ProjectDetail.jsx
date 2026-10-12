import { useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { Link, useRouter } from "../lib/router";
import { Badge, Banner, Button, Field, Sheet } from "../components/ui";
import { projectStatus } from "../components/ProjectRow";
import { KINDS, PRIORITIES } from "../services/projectService";
import { formatDate } from "../lib/format";
import { useProjects, useToast } from "../store/AppProviders";
import NotFound from "./NotFound";

const label = (list, id) => list.find((x) => x.id === id)?.label ?? id;

export default function ProjectDetail({ id }) {
  const { projects, update, remove } = useProjects();
  const { navigate } = useRouter();
  const toast = useToast();
  const project = projects.find((p) => p.id === id);
  const [note, setNote] = useState(project?.note ?? "");
  const [confirm, setConfirm] = useState(false);

  if (!project) return <NotFound />;
  const status = projectStatus(project);
  const done = project.status === "selesai";

  return (
    <div className="max-w-2xl">
      <Link to="/proyek" className="mb-4 inline-flex h-11 items-center gap-1.5 text-[15px] font-semibold text-primary">
        <LuArrowLeft size={18} aria-hidden="true" />
        Semua proyek
      </Link>

      <header className="mb-6">
        <Badge tone={status.tone}>{status.label}</Badge>
        <h1 className="mt-2 text-[1.75rem] font-extrabold sm:text-[2rem]">{project.name}</h1>
        <p className="tabular mt-1.5 text-[15px] text-muted">
          {label(KINDS, project.kind)}, prioritas {label(PRIORITIES, project.priority).toLowerCase()}, dibuat {formatDate(project.createdAt)}
        </p>
      </header>

      {done && (
        <Banner tone="success" title="Proyek ini sudah selesai" className="mb-6">
          Buka lagi bila masih ada pekerjaan tersisa.
        </Banner>
      )}

      <section aria-labelledby="catatan" className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">
        <h2 id="catatan" className="sr-only">
          Catatan
        </h2>
        <Field as="textarea" label="Catatan" hint="Keputusan, tautan, atau langkah berikutnya." value={note} onChange={(e) => setNote(e.target.value)} />
        <Button
          className="mt-4"
          variant="soft"
          disabled={note === project.note}
          onClick={() => {
            update(project.id, { note });
            toast("Catatan disimpan");
          }}
        >
          Simpan catatan
        </Button>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          variant={done ? "secondary" : "primary"}
          onClick={() => {
            update(project.id, { status: done ? "aktif" : "selesai" });
            toast(done ? "Proyek dibuka lagi" : "Proyek ditandai selesai");
          }}
        >
          {done ? "Buka lagi" : "Tandai selesai"}
        </Button>
        <Button variant="danger-ghost" onClick={() => setConfirm(true)}>
          Hapus proyek
        </Button>
      </div>

      <Sheet
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Hapus proyek ini?"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                remove(project.id);
                toast("Proyek dihapus", "alert");
                navigate("/proyek", { replace: true });
              }}
            >
              Hapus permanen
            </Button>
          </div>
        }
      >
        <p className="text-[15px] text-ink-soft">“{project.name}” dan catatannya akan hilang dan tidak bisa dikembalikan.</p>
      </Sheet>
    </div>
  );
}
