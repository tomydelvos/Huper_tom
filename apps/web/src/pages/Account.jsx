import { useState } from "react";
import { Button, ChoiceGroup, PageHeader, Sheet, Toggle } from "../components/ui";
import { useProjects, useTheme, useToast } from "../store/AppProviders";

const THEMES = [
  { id: "sistem", label: "Ikuti sistem" },
  { id: "terang", label: "Terang" },
  { id: "gelap", label: "Gelap" },
];

export default function Account() {
  const { theme, setTheme } = useTheme();
  const { projects, replaceAll } = useProjects();
  const toast = useToast();
  const [digest, setDigest] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const download = () => {
    const blob = new Blob([JSON.stringify({ projects }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: "delvos-data.json" });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Akun" lead="Data masih tersimpan di browser ini saja." />
      <div className="space-y-10">
        <section aria-labelledby="tampilan" className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">
          <h2 id="tampilan" className="mb-4 text-lg font-extrabold">
            Tampilan
          </h2>
          <div className="space-y-7">
            <ChoiceGroup label="Tema" options={THEMES} value={theme} onChange={setTheme} />
            <Toggle label="Ringkasan mingguan" description="Contoh pengaturan; belum mengirim apa pun." checked={digest} onChange={setDigest} />
          </div>
        </section>

        <section aria-labelledby="data" className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">
          <h2 id="data" className="text-lg font-extrabold">
            Data Anda
          </h2>
          <p className="tabular mt-1 text-sm text-muted">{projects.length} proyek tersimpan.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="secondary" onClick={download} disabled={!projects.length}>
              Unduh data
            </Button>
            <Button variant="danger-ghost" onClick={() => setConfirm(true)} disabled={!projects.length}>
              Hapus semua data
            </Button>
          </div>
        </section>
      </div>

      <Sheet
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Hapus semua data?"
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                replaceAll([]);
                setConfirm(false);
                toast("Semua data dihapus", "alert");
              }}
            >
              Hapus semua
            </Button>
          </div>
        }
      >
        <p className="text-[15px] text-ink-soft">Semua proyek dan catatan di browser ini akan hilang. Unduh data dulu bila masih perlu.</p>
      </Sheet>
    </div>
  );
}
