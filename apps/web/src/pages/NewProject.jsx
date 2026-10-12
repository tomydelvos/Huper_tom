import { useEffect, useRef, useState } from "react";
import { LuArrowLeft, LuX } from "react-icons/lu";
import { Link, useRouter } from "../lib/router";
import { Button, ChoiceGroup, Field } from "../components/ui";
import { KINDS, PRIORITIES } from "../services/projectService";
import { useProjects, useToast } from "../store/AppProviders";
import { cx } from "../lib/cx";

const STEPS = [
  { title: "Beri nama proyek", lead: "Nama pendek yang mudah dikenali tim." },
  { title: "Jenis pekerjaan", lead: "Dipakai untuk mengelompokkan proyek." },
  { title: "Prioritas dan catatan", lead: "Catatan boleh dikosongkan dan diisi nanti." },
];

function StepDots({ current }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {STEPS.map((_, i) => (
        <span key={i} className={cx("h-1.5 rounded-full transition-all", i <= current ? "w-8 bg-primary" : "w-4 bg-line")} />
      ))}
    </div>
  );
}

export default function NewProject() {
  const { add } = useProjects();
  const { navigate } = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", kind: null, priority: "sedang", note: "" });
  const [error, setError] = useState("");
  const heading = useRef(null);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    heading.current?.focus();
  }, [step]);

  const next = () => {
    if (step === 0 && !form.name.trim()) {
      setError("Nama proyek masih kosong. Tulis minimal satu kata.");
      return;
    }
    if (step === 1 && !form.kind) {
      setError("Pilih salah satu jenis pekerjaan untuk melanjutkan.");
      return;
    }
    setError("");
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    const project = add({ ...form, name: form.name.trim() });
    toast("Proyek dibuat");
    navigate(`/proyek/${project.id}`, { replace: true });
  };

  const { title, lead } = STEPS[step];

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4 sm:px-6">
      <header className="flex h-14 items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="grid h-11 w-11 place-items-center rounded-full text-ink-soft hover:bg-sunken" aria-label="Langkah sebelumnya">
            <LuArrowLeft size={22} />
          </button>
        ) : (
          <span className="w-11" />
        )}
        <StepDots current={step} />
        <Link to="/" className="grid h-11 w-11 place-items-center rounded-full text-ink-soft hover:bg-sunken" aria-label="Batal dan kembali ke beranda">
          <LuX size={22} />
        </Link>
      </header>

      <form
        className="mt-6 flex flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <p className="tabular text-sm font-semibold text-muted">
          Langkah {step + 1} dari {STEPS.length}
        </p>
        <h1 ref={heading} tabIndex={-1} className="mt-1 text-[1.65rem] font-extrabold outline-none sm:text-[2rem]">
          {title}
        </h1>
        <p className="mt-2 max-w-prose text-[15px] text-muted">{lead}</p>

        <div className="mt-7 space-y-7">
          {step === 0 && (
            <Field
              label="Nama proyek"
              placeholder="Contoh: Halaman harga baru"
              value={form.name}
              error={error}
              onChange={(e) => set("name")(e.target.value)}
              autoFocus
            />
          )}
          {step === 1 && (
            <>
              <ChoiceGroup label="Jenis" options={KINDS} value={form.kind} onChange={set("kind")} columns />
              {error && <p className="text-sm text-alert">{error}</p>}
            </>
          )}
          {step === 2 && (
            <>
              <ChoiceGroup label="Prioritas" options={PRIORITIES} value={form.priority} onChange={set("priority")} />
              <Field as="textarea" label="Catatan" hint="Opsional." value={form.note} onChange={(e) => set("note")(e.target.value)} />
            </>
          )}
        </div>

        <div className="mt-auto pt-10">
          <Button type="submit" size="lg" block>
            {step < STEPS.length - 1 ? "Lanjut" : "Buat proyek"}
          </Button>
        </div>
      </form>
    </div>
  );
}
